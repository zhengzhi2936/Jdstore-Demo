module ProductsHelper
  def trancate(string, length = 20)
	  string.size > length+5 ? [string[0,length],string[-5,5]].join("...") : string
	end
end
