# frozen_string_literal: true
require 'new_relic/agent/method_tracer'

class LinkToCartComponent < ViewComponent::Base

  include ::NewRelic::Agent::MethodTracer

  delegate :current_order, :spree, to: :helpers

  def call
    link_to text.html_safe, cart_path, class: "cart-info #{css_class}", title: 'Cart'
  end

  private

  def text
    empty_current_order? ? '' : "<div class='link-text'>#{current_order.item_count}</div>"
  end

  def css_class
    empty_current_order? ? 'empty' : 'full'
  end

  def empty_current_order?
    current_order.nil? || current_order.item_count.zero?
  end

  add_method_tracer :call, 'Custom/LinkToCartComponent:call'
  add_method_tracer :text, 'Custom/LinkToCartComponent:text'

end
