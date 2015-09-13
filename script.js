$("#form").submit(function(event){
	event.preventDefault();
	console.log("submitted")
	var userName = $("#user").val()
	var repoName = $("#repo").val()
	$.ajax({
	  url: 'https://api.github.com/repos/'+userName+'/'+repoName+'/commits',
	  success: function(response){
	    if(response){
	      var obj = response
	      // console.log(obj)
	      // console.log(obj.length)
	      // console.log(obj[0].commit.message)
	      for(var i = 0; i<obj.length; i++){
	        if(obj[i].commit.message.toLowerCase().indexOf("merge") > -1){


	          var date = new Date(obj[i].commit.committer.date)
	          var now = new Date(Date.now())

	          var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

	          var diffDays = Math.floor(Math.abs((now.getTime() - date.getTime())/(oneDay)));

	          $("#message").text("It has been "+diffDays.toString()+" days since the last merge conflict")
	          return diffDays
	        }
	      }
	      $("#message").text("There have never been any merge conflicts")
	      return -1
	    }
	  }
	});
})