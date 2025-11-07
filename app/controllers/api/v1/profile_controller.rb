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
        if current_user.update(profile_params)
          render json: current_user
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def profile_params
        params.permit(:username, :display_name, :bio, :location, :url, :avatar)
      end
    end
  end
end
