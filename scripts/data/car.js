export class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = carDetails.speed;
    }
    displayInfo(){
        console.log(`${this.#brand} ${this.#model},
Speed: ${this.speed}km/h,
${this.isTrunkOpen ? 'Trunk is Opened': 'Trunk is Closed'} 
             `);
    }
    go(){
        if(this.isTrunkOpen){
            console.log('Your trunk is open');
            this.speed = 0;
        }else{
            let validSpeed = this.speed +=5;
            if(0<=validSpeed && validSpeed<=200){
                console.log(`${this.#model}: ${validSpeed}`);
            }else{
                console.log(`${this.#model}: ${this.speed}`);
        }
        }
    }
    brake(){
        let validSpeed = this.speed -5;
        if(0<=validSpeed && validSpeed<=200){
            this.speed -= 5;
            console.log(`${this.#model}: ${validSpeed}`);
        }else{
            console.log(`${this.#model}: ${this.speed}`);
        }
    }
    openTrunk(){
        if(this.speed>0){
            console.log('Stop the car to open the trunk.')
        }
        this.isTrunkOpen = true;
    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }
    go(){
        let validSpeed = this.speed += this.acceleration;
        if(0<=validSpeed && validSpeed<=300){
            console.log(`${this.model}: ${validSpeed}`);
        }else{
            console.log(`${this.model}: ${this.speed}`);
        }
    }
    displayInfo(){
        console.log(`${this.brand} ${this.model},
Speed: ${this.speed}km/h,
Acceleration: ${this.acceleration} 
             `);
    }
    openTrunk(){
        console.log('Race cars do not have a trunk.');
        
    }
    closeTrunk(){
        console.log('Race cars do not have a trunk.');
    }

}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla',
    speed: 200,
    isTrunkOpen: true 
});

const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3',
    speed: 180,
    isTrunkOpen: false
});

const raceCar = new RaceCar({
    brand: 'Macleran',
    model: 'F1',
    speed: 220,
    acceleration: 20
})

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

car1.go();
car2.brake();
car1.brake();
car2.go();
car1.brake();
car2.go();
car1.brake();
car2.go();
car1.brake();
car2.go();

car1.displayInfo();
car2.displayInfo();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();

