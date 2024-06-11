const initiateComponent = async () => {
    try {

        const response = await fetch('../components/navbar.html')
        if (response.ok) {
            const navbarHtml = await response.text()
            document.body.insertAdjacentHTML('afterbegin', navbarHtml)
        } else {
            console.error('navbar was not adjusted')
        }
        let items = JSON.parse(localStorage.getItem('cart-items'))
        document.getElementById('cartCount').innerHTML = items?items.length:0
    } catch(error) {
        alert("Something went wrong")
        console.log(error)
    }

}   

export default initiateComponent
