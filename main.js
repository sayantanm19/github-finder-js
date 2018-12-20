const MAX_REPOS = 5;
const TIMEOUT = 500;
let timer = null;

//document.querySelector('#get-trending').addEventListener('click', getUser);

document.querySelector('#username-input').addEventListener('keyup', () => {
    clearTimeout(timer);

    timer = setTimeout(getUser, TIMEOUT)
});


function getUser() {

    const username = document.querySelector('#username-input').value;

    if (username != '') {

        // Fetch User Profile
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.text())
            .then(res => showProfile(JSON.parse(res)))
            .catch(reject => console.log(reject));

    }
    //e.preventDefault();
}

function showProfile(data) {

    document.querySelector('.content').setAttribute("style", "display:block;");
    console.log('profile');
    if (data.message === "Not Found") {
        document.querySelector('.content').setAttribute('style', 'display:none;');
        document.querySelector('.notFound').setAttribute('style', 'display:block;');
    }

    else {

        document.querySelector('.notFound').setAttribute('style', 'display:none;');

        //console.log(data.login);
        //document.querySelector('.avatar').innerHTML = `<img src="${data.avatar_url}" class="gravatar">`;
        document.querySelector('.avatar').setAttribute('style', `background-image: url(${data.avatar_url};`);

        document.querySelector('.username').innerHTML = data.login;
        document.querySelector('.bio').innerHTML = data.bio;
        document.querySelector('.name').innerHTML = data.name;
        if (data.blog != null)
            document.querySelector('.blog').innerHTML = `<i class="fas fa-globe"></i> ${data.blog}`;
        if (data.company != null)
            document.querySelector('.company').innerHTML = `<i class="fas fa-building"></i> ${data.company}`;
        if (data.email != null)
            document.querySelector('.email').innerHTML = `<i class="fas fa-at"></i> ${data.email}`;
        if (data.location != null)
            document.querySelector('.location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}`;
        document.querySelector('.gists').innerHTML = `<b>Gists:</b> ${data.public_gists}`;
        document.querySelector('.repo_count').innerHTML = `<b>Repositories:</b> ${data.public_repos}`;
        document.querySelector('.followers').innerHTML = `<b>Followers: </b> ${data.followers}`;
        document.querySelector('.following').innerHTML = `<b>Following: </b> ${data.following}`;

        // Fetch User Repositories
        if (data.public_repos > 0) {
            console.log('Fetching Repos');

            fetch(`https://api.github.com/users/${data.login}/repos`)
                .then(response => response.text())
                .then(res => showRepos(JSON.parse(res)))

                .catch(reject => console.log(reject));
        }
        else {
            document.querySelector('.repos').innerHTML = `<b>No Repositories</b>`;

        }
    }

}

function showRepos(data) {

    console.log('Total Repos', data.length);

    //if (data.lenght > 0) {
    let loop;
    let output = '';

    console.log(data);

    if (data.length > 5)
        loop = 5;
    else
        loop = data.length;
    for (let i = 0; i < loop; i++) {
        repo = data[i];
        
        // Check for Text-based Repos
        if (repo.language == null)
            repo.language = 'Text';
        repo.description = repo.description.substring(0,100);

        output += `

            <div class="row">
                        <div class="col s12 m9 l9">
                            <h5>${repo.name}</h5>
                            <p id="repo-desc">${repo.description}</p>
                            <p><b>LANGAUGE:  </b>${repo.language}</p>
                            <p><b>FORKS:  </b>${repo.forks}</p>
                            <p><b>STARS:  </b>${repo.stargazers_count}</p>
                        </div>
                        <div class="col s12 m3 l3 offset-l9 offset-m9 offset-s7">
                            <div class="link-button">
                                <a href=${repo.html_url}><button class="waves-effect waves-light btn blue">Visit Repo</button></a>
                            </div>
                        </div>

            </div>

            `;
            //<hr>

    }

    document.querySelector('.repos').innerHTML = output;

    // output += `
    //             <div class="row">
    //                 <div class="col s12">
    //                     <div class="card">
    //                         <div class="card-content">
    //                             <div class="row">
    //                                 <div class="col l9">
    //                                     <h4>${repo.name}</h4>
    //                                     <p id="repo-desc">${repo.description}</p>
    //                                     <!--p><b>LANGAUGE:  </b>${repo.language}</p-->
    //                                     <p><b>FORKS:  </b>${repo.forks}</p>
    //                                     <p><b>STARS:  </b>${repo.stars}</p>

    //                                 </div>
    //                                 <div class="col offset-l9">
    //                                     <a href=${repo.url}><button class="waves-effect waves-light btn blue">Visit Repo</button></a>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>`;
    // });
    //}

}

// MaterializeCSS Form Select Initialize
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

