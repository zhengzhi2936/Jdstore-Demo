module ProductsHelper
  def render_highlight_content(product,query_string)
    excerpt_cont = excerpt(product.title, query_string, radius: 500)
    highlight(excerpt_cont, query_string)
  end

  def trancate(string, length = 20)
	  string.size > length+5 ? [string[0,length],string[-5,5]].join("...") : string
	end
end
