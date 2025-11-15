"""Celery configuration for background job processing."""
import os

# Broker and result backend URL from environment variables
broker_url = os.getenv("REDIS_URL")
result_backend = os.getenv("REDIS_URL")

# Task serialization
task_serializer = "json"
accept_content = ["json"]
result_serializer = "json"

# Timezone configuration (UTC per MASTER_PROMPT_BACKEND.md §10)
timezone = "UTC"
enable_utc = True

# Task routing and priority
task_default_queue = "default"
task_default_exchange = "default"
task_default_exchange_type = "direct"
task_default_routing_key = "default"

# Task execution configuration
task_time_limit = 60 * 30  # 30 minutes hard limit
task_soft_time_limit = 60 * 25  # 25 minutes soft limit
worker_prefetch_multiplier = 1  # Disable prefetching for fair distribution
worker_max_tasks_per_child = 1000  # Restart worker after 1000 tasks

# Result backend configuration
result_expires = 3600  # Results expire after 1 hour

# Worker log format
worker_log_format = "[%(asctime)s: %(levelname)s/%(processName)s] %(message)s"
worker_task_log_format = "[%(asctime)s: %(levelname)s/%(processName)s][%(task_name)s(%(task_id)s)] %(message)s"

