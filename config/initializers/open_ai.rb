OpenAI.configure do |config|
  config.uri_base = ENV["OPENAI_URI_BASE"]
  config.access_token = ENV["OPENAI_ACCESS_TOKEN"]

  # Optional, used for admin endpoints, created here: https://platform.openai.com/settings/organization/admin-keys
  # config.admin_token = ENV.fetch("OPENAI_ADMIN_TOKEN")

  # Optional
  # config.organization_id = ENV.fetch("OPENAI_ORGANIZATION_ID")

  # Highly recommended in development, so you can see what errors OpenAI is returning.
  # Not recommended in production because it could leak private data to your logs.
  config.log_errors = ENV["OPENAI_LOG_ERRORS"] == "true"
end
