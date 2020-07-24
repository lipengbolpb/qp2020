const filter = {
	timeSplit:function(str){
		if(str){
			return str.split('.')[0]
		}else{
			return ['']
		}
	}
}
export default filter