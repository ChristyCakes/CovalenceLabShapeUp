$(document).ready(function() {
    //create a random number generator to place shapes in the container 
    function randomVal(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //set shape classes
    class Shape {
        constructor(x, y, height) {
            this.height = height;

            //create shape with height & location
            this.shape = $('<div></div>').css({
                "margin-left": `${x}px`,
                "margin-top": `${y}px`,
                "position": "absolute",
                "height": `${this.height}px`
                // also can use "height": `${height}px`
            })
            
            //put shape in grey container
            $('#container3').append(this.shape);

            //remove if shape is double clicked
            $(this.shape).dblclick(() => (this.shape).remove());
        }
    }
    class Circle extends Shape {
        //use 'height' as radius
        constructor(x, y, height) {
            super(x, y, height);

            //add dimensions, color to shape
            $(this.shape).css({
                "width": `${height}px`,
                "background-color": "rgb(0, 255, 255)",
                "-moz-border-radius": "50%",
                "-webkit-border-radius": "50%",
                "border-radius": "50%" 
            }) 
        }
        describe() {
            //calculate area & circumference/perimeter
            let a = Math.round(this.height*this.height*Math.PI)/10;
            let circumf = Math.round(this.height*2*Math.PI)/10;
            
            //set values in properties panel on hover
            $(this.shape).hover( () => {
                $('#shape-name').text("Circle");
                $('#width').text(" ");
                $('#height').text(`Radius: ${this.height} pixels`);
                $('#area').text(`Area: ${a} square pixels`);
                $('#perimeter').text(`Circumference: ${circumf} pixels`);           
                } , () => {
                $('#shape-name').text("Hover over shape to see properties");
                $('#height').text(" ");
                $('#area').text(" ");
                $('#perimeter').text(" ");
                }
            )            
        }
    }     
    class Square extends Shape {    
        constructor(x, y, height) {
            super(x, y, height);
            $(this.shape).css({
                "width": `${height}px`,
                "background-color": "rgb(255,255,0)"
            }) 
        }
        describe() {
            let a = this.height*this.height;
            let p = 4*this.height;
            $(this.shape).hover( () => {
                $('#shape-name').text("Square");
                $('#width').text(`Width: ${this.height} pixels`);
                $('#height').text(`Height: ${this.height} pixels`);
                $('#area').text(`Area: ${a} square pixels`);
                $('#perimeter').text(`Perimeter: ${p} pixels`);           
                } , () => {
                $('#shape-name').text("Hover over shape to see properties");
                $('#width').text(" ");
                $('#height').text(" ");
                $('#area').text(" ");
                $('#perimeter').text(" ");
                }
            )
        }
    } 
    class Rectangle extends Shape {
        constructor(x, y, height, width) {
            super(x, y, height);
            this.width = width;          
            $(this.shape).css({
                "width": `${width}px`,
                "background-color": "rgb(231, 10, 186)"
            }) 
        }
        describe() {
            let a = this.height*this.width;
            let p = (2*this.height)+(2*this.width);
            $(this.shape).hover( () => {
                $('#shape-name').text("Rectangle");
                $('#width').text(`Width: ${this.width} pixels`);
                $('#height').text(`Height: ${this.height} pixels`);
                $('#area').text(`Area: ${a} square pixels`);
                $('#perimeter').text(`Perimeter: ${p} pixels`);           
                } , () => {
                $('#shape-name').text("Hover over shape to see properties");
                $('#width').text(" ");
                $('#height').text(" ");
                $('#area').text(" ");
                $('#perimeter').text(" ");
                }
            )
        }
    }
    class Isosceles extends Shape {
        constructor(x, y, height) {
            super(x, y, height);
            $(this.shape).css({
                "width": "0",
                "height": "0",
                "border-top": `${height}px solid rgb(57, 255, 20)`,
                "border-right": `${height}px solid transparent`
            })    
        }
        describe(){
            let a = (0.5)*this.height*this.height;
            let p = Math.round(2*this.height + (Math.sqrt(2*this.height*this.height)))/10;
            $(this.shape).hover( () => {
                $('#shape-name').text("Isosceles Right Triangle");
                $('#width').text(`Width: ${this.height} pixels`);
                $('#height').text(`Height: ${this.height} pixels`);
                $('#area').text(`Area: ${a} square pixels`);
                $('#perimeter').text(`Perimeter: ${p} pixels`);           
                } , () => {
                $('#shape-name').text("Hover over shape to see properties");
                $('#width').text(" ");
                $('#height').text(" ");
                $('#area').text(" ");
                $('#perimeter').text(" ");
                }
            )
        }
    }
    //set click listeners on shape buttons
    $('#rbtn').click(function(){

        //get user input for size
        let height = Number($('#h').val());
        let width = Number($('#w').val());

        //generate value from 0 to 600 (container size) for x and y coordinates
        //but only if user enters a value in range, if not display alert
        let xVal = randomVal(0, 600);
        if (width <= 0 || width > 600) {
            alert("Insert a value greater than 0 and up to 600");
        } else {
            while (xVal + width > 600) {        //regenerate if shape will fall outside container
                xVal = randomVal(0, 600);
            }
        }
        let yVal = randomVal(0, 600);
        if (height <= 0 || height > 600) {  
            alert("Insert a value greater than 0 and up to 600");
        } else {
            while (yVal + height > 600) {
                yVal = randomVal(0, 600);
            }
        }
        //create rectangle object with rectangle class, call properties method
        if (height > 0 && height <= 600 && width > 0 && width <= 600) {
            let r = new Rectangle(xVal, yVal, height, width);
            r.describe();    
        }     
    })
    $('#sbtn').click(function(){
        let height = Number($('#sqin').val());
        if (height <= 0 || height > 600) {  
            alert("Insert a value greater than 0 and up to 600");
        } else {
            let xVal = randomVal(0, 600);
            while (xVal + height > 600) {
                xVal = randomVal(0, 600);
            }
            let yVal = randomVal(0, 600);
            while (yVal + height > 600) {
                yVal = randomVal(0, 600);
            }    
            let s = new Square(xVal, yVal, height);
            s.describe();
        }
    })
    $('#cbtn').click(function(){
        let radius = Number($('#cin').val());
        if (radius <= 0 || radius > 600) {  
            alert("Insert a value greater than 0 and up to 600");
        } else {     
            let xVal = randomVal(0, 600);
                while (xVal + radius > 600) {
                    xVal = randomVal(0, 600);
                }
            let yVal = randomVal(0, 600);
                while (yVal + radius > 600) {
                    yVal = randomVal(0, 600);
                }        
            let c = new Circle(xVal, yVal, radius);
            c.describe();
        }
    })
    $('#ibtn').click(function(){
        let height = Number($('#iin').val());
        if (height <= 0 || height > 600) {  
            alert("Insert a value greater than 0 and up to 600");
        } else {  
            let xVal = randomVal(0, 600);
                while (xVal + height > 600) {
                    xVal = randomVal(0, 600);
                }
            let yVal = randomVal(0, 600);
                while (yVal + height > 600) {
                    yVal = randomVal(0, 600);
                }        
            let i = new Isosceles(xVal, yVal, height);
            i.describe();
        }
    })
  })