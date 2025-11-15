"""Application configuration loading from environment variables."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Database URLs
    # DATABASE_URL: Neon pooled connection (PgBouncer) used by the running app
    DATABASE_URL: str
    
    # DATABASE_URL_DIRECT: Neon direct connection used by Alembic for schema migrations
    DATABASE_URL_DIRECT: str | None = None
    
    # ALEMBIC_DATABASE_URL: Preferred direct connection for Alembic (takes precedence over DATABASE_URL_DIRECT)
    ALEMBIC_DATABASE_URL: str | None = None
    
    # Authentication
    AUTH_PROVIDER: str = "local"  # "local" or "clerk"
    APP_SECRET: str | None = None  # Secret key for local JWT signing (HS256)
    DEV_USERS: str = ""  # Comma-separated list of "email:$2b$hash" pairs for local auth
    CLERK_API_KEY: str | None = None  # Clerk API key (only needed when AUTH_PROVIDER=clerk)
    
    # Pagination
    PAGE_LIMIT_DEFAULT: int = 50
    MAX_PAGE_LIMIT: int = 100
    
    # CORS
    CORS_ORIGINS: str = "*"
    
    # Celery/Redis
    REDIS_URL: str | None = None  # Redis URL for Celery broker and result backend
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # Allow extra env vars without validation errors
    
    @property
    def get_direct_db_url(self) -> str:
        """Get the direct database URL for Alembic migrations (prefer ALEMBIC_DATABASE_URL)."""
        return self.ALEMBIC_DATABASE_URL or self.DATABASE_URL_DIRECT or self.DATABASE_URL


# Global settings instance
settings = Settings()

