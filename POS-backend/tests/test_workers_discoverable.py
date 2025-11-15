"""Test that Celery workers are properly configured and discoverable."""
import pytest
from app.workers.celery_app import celery_app


def test_celery_app_configured():
    """Verify Celery app is properly configured."""
    assert celery_app is not None
    assert celery_app.main == "iris_workers"


def test_forecast_task_discoverable():
    """Verify forecast task is discoverable."""
    from app.workers.forecast import update_forecast
    
    assert update_forecast is not None
    assert hasattr(update_forecast, 'name')


def test_connector_tasks_discoverable():
    """Verify connector tasks are discoverable."""
    from app.workers.connectors import (
        sync_supplier_catalog,
        watch_connector_dom,
        prefill_supplier_cart,
        pull_supplier_invoice
    )
    
    assert sync_supplier_catalog is not None
    assert watch_connector_dom is not None
    assert prefill_supplier_cart is not None
    assert pull_supplier_invoice is not None


def test_notification_tasks_discoverable():
    """Verify notification tasks are discoverable."""
    from app.workers.notifications import (
        send_order_notification,
        send_delivery_notification
    )
    
    assert send_order_notification is not None
    assert send_delivery_notification is not None


def test_pricing_task_discoverable():
    """Verify pricing task is discoverable."""
    from app.workers.pricing import refresh_pricing
    
    assert refresh_pricing is not None


def test_ocr_task_discoverable():
    """Verify OCR task is discoverable."""
    from app.workers.ocr import extract_invoice_lines
    
    assert extract_invoice_lines is not None

