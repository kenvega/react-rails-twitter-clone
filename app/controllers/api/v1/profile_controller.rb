# frozen_string_literal: true

module Api
  module V1
    class ProfileController < ApplicationController
      before_action :authenticate_user!

      # GET /bookmarks
      def show
        render json: current_user
      end

      def update
        if current_user.update(profile_params_with_avatar)
          render json: current_user
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def profile_params_with_avatar
        permitted = params.permit(:username, :display_name, :bio, :location, :url, :avatar)
        permitted[:avatar].present? ? permitted : permitted.except(:avatar) # leaves avatar untouched
      end
    end
  end
end
