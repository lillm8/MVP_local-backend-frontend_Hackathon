"""Test event dispatching system."""
import pytest
from unittest.mock import patch, MagicMock
from app.core.events import (
    dispatch_order_placed,
    dispatch_delivery_marked,
    dispatch_invoice_matched
)


@patch('app.core.events.current_app')
def test_dispatch_order_placed(mock_celery_app):
    """Test OrderPlaced event dispatching."""
    mock_celery_app.send_task = MagicMock()
    
    order_id = "test-order-id"
    dispatch_order_placed(order_id)
    
    # Should call send_task for notification
    mock_celery_app.send_task.assert_called()
    call_args = mock_celery_app.send_task.call_args
    assert "send_order_notification" in call_args[0][0]


@patch('app.core.events.current_app')
def test_dispatch_delivery_marked(mock_celery_app):
    """Test DeliveryMarked event dispatching."""
    mock_celery_app.send_task = MagicMock()
    
    order_id = "test-order-id"
    dispatch_delivery_marked(order_id)
    
    # Should call send_task for notification
    mock_celery_app.send_task.assert_called()
    call_args = mock_celery_app.send_task.call_args
    assert "send_delivery_notification" in call_args[0][0]


def test_dispatch_invoice_matched():
    """Test InvoiceMatched event (placeholder)."""
    # This is a placeholder implementation, just verify it doesn't crash
    dispatch_invoice_matched("test-order-id")

