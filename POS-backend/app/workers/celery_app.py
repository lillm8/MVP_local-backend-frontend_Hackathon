"""Celery application instance for background job processing."""
from celery import Celery
from app.workers import celeryconfig

# Create Celery app instance
celery_app = Celery("iris_workers")

# Load configuration from celeryconfig.py
celery_app.config_from_object(celeryconfig)

# Auto-discover tasks from workers modules
# This will automatically discover all @shared_task decorated functions
celery_app.autodiscover_tasks(["app.workers"])

