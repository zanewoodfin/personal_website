Rails.application.routes.draw do
  root "home#index"

  devise_for :users, skip: %i[ registration ]

  namespace :api do
    namespace :v1 do
      resources :books, only: %i[ index show ]
    end
  end

  get "/admin" => "admin#index"

  namespace :admin do
    resources :books
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"

  # Route paths that are not known to Rails to the React router
  get "/*path" => "home#index"
end
