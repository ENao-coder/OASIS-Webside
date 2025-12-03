export default class EventInterface{
    constructor({
        title, description, startDate, endDate, location, goal, perfilRequired, image
    }){
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.goal = goal;
        this.perfilRequired = perfilRequired;
        this.image = image;
    }
}