

const base = 'https://api.realworld.io/api/';

export default class SwapiService {
       
    
    async getBlogList(offset)  {
        console.log(offset)
        const response = await fetch(`${base}/articles`);

        if (localStorage.getItem('token')) {
            const aaa = JSON.parse(localStorage.getItem('token')).token
            const result = await fetch(`${base}/articles?limit=4&offset=${offset}`, {
                method: 'get',
                headers: {'Content-Type': 'application/json', 'Authorization': `Token ${aaa}`},
            }) 
            if(!result.ok) {
                throw new Error(`Ошибка по адресу ${base}/articles, статус ошибки ${result}`)
            }
            const body = await result.json()
            console.log(body)
            return body;
        }

        if(!response.ok) {
            throw new Error(`Ошибка по адресу ${base}/articles, статус ошибки ${response}`)
        }
        const body = await response.json()
        return body;
    }

    async getArticle(slug) {
        const res = await fetch(`${base}/articles/${slug}`)
        const body = await res.json() 
        return body;
    }


    async getSignUp(username, email, password) {

        const result = await fetch(`${base}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"user": {username, email, password}})
        }) 
        const body = await result.json()
        return body;
    }

    async getSignIn(email, password) {
        const result = await fetch(`${base}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: {email, password}})
        }) 
        const body = await result.json()
        return body;
    }


async userUpdate(email, username, image, password) { 
    const aaa = JSON.parse(localStorage.getItem('token')).token
    const result = await fetch(`${base}/user`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' , 'Authorization': `Token ${aaa}`},
        body: JSON.stringify({user: {username, email, image, password}})
        }) 
        if(!result.ok) {
            throw new Error(`Ошибка по адресу ${base}/user, статус ошибки ${result.status}`)
        }
        const body = await result.json()
        return body;
 }

    
    async postFavorite(slug) {
        const aaa = JSON.parse(localStorage.getItem('token')).token

        const result = await fetch(`${base}/articles/${slug}/favorite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${aaa}`}
        }) 
        if(!result.ok) {
            throw new Error(`Ошибка по адресу ${base}/articles/${slug}/favorite/, статус ошибки ${result.status}`)
        }
        const body = await result.json()
        return body;
    }

    async deleteFavorite(slug) {
        const aaa = JSON.parse(localStorage.getItem('token')).token
    
        const result = await fetch(`${base}/articles/${slug}/favorite`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${aaa}`}
        }) 
        if(!result.ok) {
            throw new Error(`Ошибка по адресу ${base}/articles/${slug}/favorite/, статус ошибки ${result.status}`)
        }
        const body = await result.json()
        return body;
    }

    async getNewCreate(title, description, text, tagList) {
        const aaa = JSON.parse(localStorage.getItem('token')).token
        const result = await fetch(`${base}/articles`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${aaa}`},
            body: JSON.stringify({ "article": {
                "title": title, 
                "description": description,
                "body": text,
                "tagList": tagList
        }})
        }) 
            const body = await result.json()
            console.log(body)
            return body;
    }
    

    async updateArticle (title, description, text, slug) {
        const ccc = JSON.parse(localStorage.getItem('token')).token
      
        const result = await fetch(`${base}/articles/${slug}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${ccc}`},
            body: JSON.stringify({ "article": {
                "title": title,
                "description": description,
                "body": text
            }}),
            redirect: 'follow'
        }) 
            const body = await result.json()
            return body;
    }

    async deleteArticle(slug) {
        const ccc = JSON.parse(localStorage.getItem('token')).token

        const result = await fetch(`${base}/articles/${slug}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${ccc}`},
        })
            const body = await result.json()
            return body;
        }

}


