var dps = [];   //dataPoints. 
var chart;
var startTime;

var watchID;
var accelerometerOptions = { frequency: 1000 };  // Update every 2 seconds
accelerometerOptions.frequency = 1000; //changed my mind - now 3 seconds

$(document).on("pagecreate", "#chartPage", function () {
	
	//store start time in unixtime 
	startTime = Date.now();
	
	//set uplistener for button
	$('#addButton').on('click', function() {
	
		
		updateChart();
		
	});
    
    $("#flipswitch").on("change", function() {
		
		if( $(this).val() == "on" ) startSensor();
		else if ( $(this).val() == "off" ) stopSensor();

	});
	
	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "Sensor chart"
      	},
      	axisX: {						
      		title: "Time (seconds)"
      	},
      	axisY: {						
      		title: "Sensor Value"
      	},
        
      	data: [{
            
        type: "line",
        dataPoints: dps,[
        
        {x: accX, y: time}
      
        ]
      },
        {        
        type: "line",
        dataPoints: dps,[
            
            {x: accY, y: time}
       
      
        ]
      },
        {        
        type: "line",
        dataPoints: dps,[
         {x: accZ, y: time}
      
        ]
      }
            
            
            
            
            
            
      	}]
   	});
	
	  
});



function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
}


function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);
			
	var accX = 0;
	var accX = 0;
	var accX = 0;
	var time = 0;
}

function accelerometerSuccess(acceleration) {
	
	var accX = acceleration.x;
	var accY = acceleration.y;
	var accZ = acceleration.z;
	var time = acceleration.timestamp;

}

function accelerometerError() {
   alert('Error');
}







function updateChart() {
      	
      	//set new  y values
      	y = accelerometerSuccess;
		
		//x value is time since start 
		xVal = Date.now() - startTime;
		//concert from milliseocnds to seconds (divide by a thousand)
		xVal = xVal / 1000;
      	
		//add them to the data points to draw
		dps.push({x: xVal,y: yVal});
      	
		//don't let the chart get too big 
		//if there are more than 100 data points then start removing older data points
      	if (dps.length >  100 )
      	{
      		dps.shift();				
      	}

		//redraw the chart
      	chart.render();		
	  }
