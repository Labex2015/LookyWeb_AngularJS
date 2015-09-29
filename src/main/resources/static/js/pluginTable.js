(function ( $ ) {//função anônima

	var TableHelper = function(aux) {
		// Objeto base para o uso da função TableHelper
		var self = aux || {};

		// Limite de exibição de itens na "tabela". Default é 5
		self.limit = self.limit || 5;

		if(self.orderBy) {
			self.data.sort(self.orderBy);
		}

		// Para cada dado dentro de data adiciona na View
		for(var i in self.data) {
			if(i == self.limit)
				break;

			var d = self.data[i];
			self.target.append(self.view.replace(d));
		}

		return self;
	};
	
	$.fn.data = function(options){
		options = $.extend({
            data: [],
            itemClick: null
        }, options );
		
		var aux, aux2, aux3;
		
		for(var i in options.data){
			var data = options.data[i];
			if(!this.has("thead").length){
				aux = $("<thead></thead>");
				this.append(aux);
				aux2 = $("<tr></tr>");
				aux.append(aux2);
				for(var j in data){
					aux = $("<td>"+j+"</td>");
					aux2.append(aux);
				}
			}
			
			if(!this.has("tbody").length){
				aux = $("<tbody></tbody>");
				this.append(aux);
			} else {
				aux = this.find("tbody");
			}
			
			aux2 =  $("<tr></tr>");
			aux.append(aux2);
			console.log(aux);
			for(var j in data){
				aux3 =  $("<td>"+data[j]+"</td>");
				aux2.append(aux3);
			}
		}
	};
 
}(jQuery));//responde por duas váriaveis, o $ ou jQuery