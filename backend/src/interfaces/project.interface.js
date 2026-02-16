export default class projectInterface {
  constructor({
    title,
    description,
    goal,
    startDate,
    endDate,
    perfilRequired,
    image,
    status,
  }) {
    this.title = title;
    this.description = description;
    this.goal = goal;
    this.startDate = startDate;
    this.endDate = endDate;
    this.perfilRequired = perfilRequired;
    this.image = image;
    this.status = status;
  }
}
