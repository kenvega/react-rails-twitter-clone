# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!

      def index
        users = User.all

        render json: users
      end
    end
  end
end
