# frozen_string_literal: true

module Api
  module V1
    class TweetsController < ApplicationController
      before_action :authenticate_user!

      def show; end

      def create
        tweet = Tweet.new(tweet_params.merge(user: current_user))

        tweet.save
      end

      def index
        # these two are the same:
        #   .includes(user: :avatar_attachment)
        #   .includes(user: { avatar_attachment: :blob })
        # but second one is more explicit
        tweets = Tweet.all.includes(user: { avatar_attachment: :blob }).order(created_at: :desc)

        render json: tweets
      end

      private

      def tweet_params
        params.require(:tweet).permit(:body)
      end
    end
  end
end
