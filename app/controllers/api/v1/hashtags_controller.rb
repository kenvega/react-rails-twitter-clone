# frozen_string_literal: true

module Api
  module V1
    class HashtagsController < ApplicationController
      before_action :authenticate_user!

      def index
        hashtags = Hashtag.all.includes(:tweets)
        render json: hashtags
      end

      def show
        hashtag = Hashtag.find(params[:id])

        render json: hashtag.tweets.includes(:user).order(created_at: :desc)
      end
    end
  end
end
