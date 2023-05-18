class ApplicationController < ActionController::Base
  rescue_from Exception, with: :exception_handler

  def exception_handler(e = nil)
    if spree_current_user.present?
      ::NewRelic::Agent.add_custom_attributes({ email: spree_current_user.login})
    end
    ::NewRelic::Agent.notice_error(e)
    raise e
  end
end
