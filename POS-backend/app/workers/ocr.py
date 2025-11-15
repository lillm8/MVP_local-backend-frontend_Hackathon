"""Invoice OCR worker for text extraction and reconciliation."""
from prometheus_client import Histogram, Counter
from celery import shared_task
import time

# Metrics for OCR operations
ocr_duration = Histogram(
    "iris_ocr_job_duration_seconds",
    "Duration of invoice OCR processing in seconds",
    ["status"]
)

ocr_extraction_errors = Counter(
    "iris_ocr_extraction_errors_total",
    "Count of OCR extraction failures",
    ["error_type"]
)


@shared_task
def extract_invoice_lines(invoice_id: str, image_path: str):
    """
    Extract invoice line items using OCR.
    
    Purpose:
    - Process uploaded invoice image with Tesseract
    - Extract product names, quantities, prices
    - Reconcile with order lines (±0.5% tolerance)
    
    Frequency: Event-driven (on invoice upload)
    Worker Module: workers/ocr.py
    
    Args:
        invoice_id: Invoice UUID
        image_path: Path to uploaded invoice image
    
    Raises:
        Exception: If OCR extraction fails (falls back to manual review)
    """
    start_time = time.time()
    status = "success"
    
    try:
        # TODO: Implement Tesseract OCR
        # 1. Load invoice image from storage
        # 2. Extract text using pytesseract
        # 3. Parse structured data (products, quantities, prices)
        # 4. Match to order lines with ±0.5% tolerance
        # 5. Flag discrepancies for manual review
        pass
    except Exception as e:
        status = "error"
        ocr_extraction_errors.labels(error_type="extraction_failed").inc()
        raise
    finally:
        # Record metric duration
        duration = time.time() - start_time
        ocr_duration.labels(status=status).observe(duration)

