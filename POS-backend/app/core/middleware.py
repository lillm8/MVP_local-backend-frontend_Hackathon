"""Middleware: request ID and JSON access logging."""
import json
import logging
import time
import uuid

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class RequestIDMiddleware(BaseHTTPMiddleware):
    """Attach a unique X-Request-ID to each request and response."""

    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response


class JSONAccessLogMiddleware(BaseHTTPMiddleware):
    """Log requests in structured JSON with latency and request ID."""

    def __init__(self, app):
        super().__init__(app)
        self.logger = logging.getLogger("access")
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter("%(message)s")
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)

    async def dispatch(self, request: Request, call_next):
        start = time.time()
        response = await call_next(request)
        duration = time.time() - start
        payload = {
            "ts": int(time.time()),
            "level": "INFO",
            "message": "request",
            "method": request.method,
            "path": request.url.path,
            "status": response.status_code,
            "duration_ms": int(duration * 1000),
            "request_id": getattr(request.state, "request_id", None),
        }
        self.logger.info(json.dumps(payload))
        return response



