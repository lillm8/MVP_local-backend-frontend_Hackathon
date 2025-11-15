"""Event dispatching system for background jobs."""
from celery import current_app


def dispatch_order_placed(order_id: str):
    """
    Dispatch OrderPlaced event to trigger background tasks.
    
    Internal event flow:
    1. Trigger forecast update
    2. Send order notification
    
    Args:
        order_id: Order UUID
    """
    # Send notification
    current_app.send_task(
        "app.workers.notifications.send_order_notification",
        args=[order_id]
    )
    # TODO: Trigger forecast update if needed


def dispatch_delivery_marked(order_id: str):
    """
    Dispatch DeliveryMarked event to trigger background tasks.
    
    Internal event flow:
    1. Update supplier metrics
    2. Send delivery notification
    
    Args:
        order_id: Order UUID
    """
    # Send notification
    current_app.send_task(
        "app.workers.notifications.send_delivery_notification",
        args=[order_id]
    )


def dispatch_invoice_matched(order_id: str):
    """
    Dispatch InvoiceMatched event (internal + external).
    
    Internal: Log reconciliation success
    External: Trigger accounting webhook (future integration)
    
    Args:
        order_id: Order UUID
    """
    # TODO: Implement webhook dispatch for external integrations
    pass

