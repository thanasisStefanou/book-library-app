
   class favorBook {
    constructor(title, author ,workid ,review){
    this.title = title;
    this.author = author;
    this.workid = workid;
    this.review = review;
    }


    
    set setTitle(title){
        this.title = title;
    }

    set setWorkid(workid){
        this.workid = workid;
    }

    set setAuthor(author){
        this.author = author;
    }

    set setReview(review){
        this.review = review;
    }


    get getTitle(){
        return this.title;
    }

    get getAuthor(){
        return this.author;
    }

    get getWorkid(){
        return this.workid;
    }

    get getReview(){
        return this.review;
    }


    
}



module.exports = {favorBook:favorBook  }