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
        # TODO: finish this. change it
        @hashtag = Hashtag.find(params[:id])

        @tweet_presenters = @hashtag.tweets.includes(:user).order(created_at: :desc).map do |tweet|
          TweetPresenter.new(tweet: tweet, current_user: current_user)
        end
      end
    end
  end
end
