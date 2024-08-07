# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # where your requests come from
    # origins "http://127.0.0.1:5173"
    # origins "http://localhost:5173"
    origins "http://localhost:4242" # changed port to 4242 in frontend

    # origins "*" # this will 'open' the server to any domain so cors won't be a problem but you will have to be more careful about it

    # origins "https://super-cool-domain.com" # once you have your domain setup

    resource "*",
      headers: :any,
      expose: ["Authorization"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
