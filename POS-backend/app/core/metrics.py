"""Prometheus metrics definitions and instrumentation for Iris API."""
import time
from prometheus_client import Counter, Histogram

# API request metrics (per MASTER_PROMPT_BACKEND.md §13)
iris_api_requests_total = Counter(
    "iris_api_requests_total",
    "Total number of API requests received",
    ["method", "endpoint", "status"]
)

iris_api_errors_total = Counter(
    "iris_api_errors_total",
    "Count of failed API responses (4xx/5xx)",
    ["status", "endpoint", "error_type"]
)

iris_api_latency_seconds = Histogram(
    "iris_api_latency_seconds",
    "Request duration in seconds",
    ["method", "endpoint"],
    buckets=[0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0]
)

# Connector metrics (per MASTER_PROMPT_BACKEND.md §11)
# Note: These are defined here for documentation but implemented in workers/connectors.py
# Connector metrics are collected by Celery workers during task execution


async def metrics_middleware(request, call_next):
    """
    FastAPI middleware to instrument API requests with Prometheus metrics.
    
    Tracks:
    - Request count (iris_api_requests_total)
    - Request latency (iris_api_latency_seconds)
    - Error count (iris_api_errors_total)
    
    All timestamps are in UTC per MASTER_PROMPT_BACKEND.md invariants.
    """
    start_time = time.time()
    
    # Get endpoint path (remove query params for cleaner metrics)
    endpoint = request.url.path
    
    # Process request
    response = await call_next(request)
    
    # Calculate duration
    duration = time.time() - start_time
    
    # Extract labels
    method = request.method
    status = response.status_code
    status_class = f"{status // 100}xx"
    
    # Record metrics
    iris_api_requests_total.labels(
        method=method,
        endpoint=endpoint,
        status=status
    ).inc()
    
    iris_api_latency_seconds.labels(
        method=method,
        endpoint=endpoint
    ).observe(duration)
    
    # Record errors (4xx/5xx)
    if status >= 400:
        iris_api_errors_total.labels(
            status=status_class,
            endpoint=endpoint,
            error_type="http_error"
        ).inc()
    
    return response

