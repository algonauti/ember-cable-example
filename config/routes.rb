Rails.application.routes.draw do
  # keep this on top
  match '/websocket', to: ActionCable.server, via: [:get, :post]
  
  mount_ember_app :frontend, to: "/"
end
