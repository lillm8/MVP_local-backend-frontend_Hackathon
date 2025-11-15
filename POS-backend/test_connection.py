"""Simple script to test Neon database connection.
    
Run this script to verify that your Neon database connections are working correctly.
This tests both pooled (DATABASE_URL) and direct (DATABASE_URL_DIRECT) connections.
"""
import asyncio
from app.core.config import settings
from app.core.database import engine
from sqlalchemy import text


async def test_pooled_connection():
    """Test pooled connection (DATABASE_URL)."""
    print("Testing pooled connection (DATABASE_URL)...")
    try:
        async with engine.begin() as conn:
            result = await conn.execute(text("SELECT 1 as test, current_time"))
            row = result.fetchone()
            print(f"✅ Pooled connection successful: {row[0]} at {row[1]}")
        return True
    except Exception as e:
        print(f"❌ Pooled connection failed: {e}")
        return False


async def test_timezone():
    """Test timezone configuration."""
    print("\nTesting timezone settings...")
    try:
        async with engine.begin() as conn:
            result = await conn.execute(text("SHOW timezone"))
            timezone = result.fetchone()[0]
            print(f"✅ Current timezone: {timezone}")
            
            # Test Europe/Stockholm conversion
            result = await conn.execute(text(
                "SELECT timezone('Europe/Stockholm', now())"
            ))
            stockholm_time = result.fetchone()[0]
            print(f"✅ Stockholm time: {stockholm_time}")
        return True
    except Exception as e:
        print(f"❌ Timezone test failed: {e}")
        return False


async def main():
    """Run all connection tests."""
    print("=" * 50)
    print("Neon Connection Test")
    print("=" * 50)
    print(f"\nDATABASE_URL: {settings.DATABASE_URL[:50]}...")
    print(f"DATABASE_URL_DIRECT: {settings.DATABASE_URL_DIRECT[:50]}...\n")
    
    pooled_ok = await test_pooled_connection()
    timezone_ok = await test_timezone()
    
    print("\n" + "=" * 50)
    if pooled_ok and timezone_ok:
        print("✅ All tests passed! Neon connection is working.")
    else:
        print("❌ Some tests failed. Check your configuration.")
    print("=" * 50)


if __name__ == "__main__":
    asyncio.run(main())

