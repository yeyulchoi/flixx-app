const global ={

    currentPage:window.location.pathname,

}

async function displayMovieBasic(){
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTkxNzEzMGFjN2M5ZDM4YTc1ZmNmMmVhNjg4NDhjNSIsIm5iZiI6MTcxOTUyNDk3OS4yMDg4NTYsInN1YiI6IjY2NzViODE5MTJkMDBkOWNkNTViNDUzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GLNHz-LHw3NhixUi7ylMDFPn7uLyBh-H-GnL8w1RSU'
            }
            }
        
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        
        const data= await response.json();
        const movies= await data.results;
    return movies;

}

// fetch data of popular movies
async function displayPopularMovie(){
        const movies = await displayMovieBasic()
                
        movies.forEach((movie)=>{
            const container = document.querySelector('#popular-movies')
            const div =document.createElement('div');
            div.classList.add('.card');
            div.innerHTML=`
             
              <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path?
                `<img
                // src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}"
                   src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
                  class="card-img-top" alt="${movie.title}" />`
                  :`<img src="../images/no-image.jpg" class="card-img-top" alt="movie Title"/>`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
              </div>`
                      
             

            container.appendChild(div)
             })
              
       return movies
  }



// fetch data of popular tv Shows
async function displayPopularTVShow(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTkxNzEzMGFjN2M5ZDM4YTc1ZmNmMmVhNjg4NDhjNSIsIm5iZiI6MTcxOTUyNDk3OS4yMDg4NTYsInN1YiI6IjY2NzViODE5MTJkMDBkOWNkNTViNDUzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GLNHz-LHw3NhixUi7ylMDFPn7uLyBh-H-GnL8w1RSU'
        }
      };
    
      const response2= await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
       const data2= await response2.json();
       const tvShows =await data2.results
      
    
     
    tvShows.forEach((show)=>{
        const container = document.querySelector('#popular-shows')
        const div =document.createElement('div');
        div.classList.add('.card');
        div.innerHTML=`
         
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path?
            `<img
              src="https://image.tmdb.org/t/p/w200${show.poster_path}"
              class="card-img-top" alt="${show.original_name}" />`
              :`<img src="../images/no-image.jpg" class="card-img-top" alt="movie Title"/>`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>`
                  
         

        container.appendChild(div)
        
    
         })  
          
         return tvShows
   

}

// Display moive details
async function displayMovieDetails(){
    const API_KEY="ce917130ac7c9d38a75fcf2ea68848c5"
    const movieId=window.location.search.split("=")[1]  // .search => ?id=1022789
    

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTkxNzEzMGFjN2M5ZDM4YTc1ZmNmMmVhNjg4NDhjNSIsIm5iZiI6MTcxOTUyNDk3OS4yMDg4NTYsInN1YiI6IjY2NzViODE5MTJkMDBkOWNkNTViNDUzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GLNHz-LHw3NhixUi7ylMDFPn7uLyBh-H-GnL8w1RSU'
        }
      };
      
      const response =await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      const movie=await response.json()

         // overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path)
    

      

    const movie_detail=document.querySelector('#movie-details')
    const div=document.createElement('div');
  
    div.innerHTML=`
                <div class="details-top">
                <div>               
             
                <img src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}" class="card-img-top" alt="" />
                 
                </div>
                <div>
                    <h2>${movie.title}</h2>
                    <p>
                    <i class="fas fa-star text-primary"></i>
                    ${movie.vote_average}/ 10
                    </p>
                    <p class="text-muted">Release Date: ${movie.release_date}</p>
                    <p>
                    ${movie.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                        ${movie.genres.map((genre)=>
                            `<li>${genre.name}</li>`
                        ).join("")}
                    </ul>
                    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
                </div>
                </div> 
                <div class="details-bottom">
                <h2>Movie Info</h2>
                <ul>
                    <li><span class="text-secondary">Budget:</span> $${addCommaToNumber(movie.budget)}</li>
                    <li><span class="text-secondary">Revenue:</span> $${addCommaToNumber(movie.revenue)}</li>
                    <li><span class="text-secondary">Runtime:</span> ${addCommaToNumber(movie.runtime)} minutes</li>
                    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
                </ul>
                <h4>Production Companies</h4>
                <div class="list-group">
                        ${movie.production_companies.map(company=>
                            `<span> ${company.name} </span>`
                            ).join(", ")}
                </div>
                </div> 
                    `
        
    
     movie_detail.appendChild(div)
   
   
   
    return movie;
}

// Display show details
async function displayShowDetails(){

    const showId=window.location.search.split("=")[1]  // .search => ?id=1022789
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTkxNzEzMGFjN2M5ZDM4YTc1ZmNmMmVhNjg4NDhjNSIsIm5iZiI6MTcxOTU1MjkxMi4zMjI3MDEsInN1YiI6IjY2NzViODE5MTJkMDBkOWNkNTViNDUzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HT-VflmrbPlsvQ09PEpdWr7EoMe7duWzLk_TuuRWI-w'
        }
      };
      
   
    const responseTv =await fetch(`https://api.themoviedb.org/3/tv/${showId}?language=en-US`, options)
    const show=await responseTv.json()

    //      // overlay for background image
    // displayBackgroundImage('show', show.backdrop_path)
    

    const show_detail=document.querySelector('#show-details')
    const tvDetailDiv=document.createElement('div');
    tvDetailDiv.innerHTML=`
        <div class="details-top">
          <div>
            <img
              src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2${show.poster_path}"
              class="card-img-top"
              alt="${show.original_name}"
            />
          </div>
          <div>
            <h2>${show.original_name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date} </p>
            <p>
            ${
                show.overview?
            `${show.overview}`: `Overview will be updated.`
            }
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map((genre)=>
                    `<li>${genre.name}</li>`).join("")}
            
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span>${show.number_of_episodes} </li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${
            show.production_companies.map( company=>
            `<span>${company.name}</span>`
            ).join(", ")
          }
          
          
          </div>
        </div> `
    
    

    
     show_detail.appendChild(tvDetailDiv)
   
   return show;
}
function displayBackgroundImage(type, backgroundPath){
    const overlayDiv= document.createElement('div')
    overlayDiv.style.backgourndImage=`url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${backgroundPath})`;
    
    overlayDiv.style.backgroundSize='cover';

    if(type==='movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }


}

function addCommaToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}




//function show spinner
function showSpinner(){
    document.querySelector('.spinner').classList.add('show')

}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')

}


//Highlight active link

function highlightActiveLinks(){
    const links=document.querySelectorAll('.nav-link');
    
    links.forEach( (link)=>{
        if(link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }
    }

    )

}


//init APP

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            console.log(displayPopularMovie() );
            break;
        case '/shows.html':
             console.log(displayPopularTVShow() );
            
            break;
        case '/movie-details.html':
            console.log(displayMovieDetails());
            break;
        case '/tv-details.html':
             console.log(displayShowDetails());
            break;
        case '/search.html':
            // console.log('Search');
            break;              
    }
    highlightActiveLinks()
    
}

document.addEventListener('DOMContentLoaded',init);


