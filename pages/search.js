import Image from "next/image";
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoCard from '../components/InfoCard'
import {useRouter} from "next/dist/client/router";
import {format} from "date-fns"


function Search({searchResults}) {
    const router =useRouter();
    const {location , startDate , endDate , noofGuests} = router.query;
    const formattedStartDate = format(new Date(startDate) , "dd MMMM yy")
    const formattedendDate = format(new Date(endDate) , "dd MMMM yy")
    const range= `${formattedStartDate} - ${formattedendDate}`

  return (
<div className ="" >
<Header  placeholder = {`${location} | ${range} | ${noofGuests}`}/>
<main className ="flex">

<section className = "flex-grow pt-14 px-6">
<p className ="text-xs">300+ Stays -{range} for {noofGuests} number of guests </p>
<h1 className = "text-3xl font-semibold mt-2 mb-6">Stays in {location} </h1>
<div className = "hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-no-wrap">
<p className = "button">Cancellation Flexibility </p>
<p className = "button"> Price </p>
<p className = "button"> Type of Place </p>
<p className = "button"> Rooms and Bed </p>
<p className = "button">More Filters  </p>
</div>
<div className = "flex flex-col">
{searchResults.map((item) => (
  <InfoCard img = {item.img}  key = {item.img}  total = {item.total} title = {item.title} description = {item.description} price = {item.price} star = {item.star} location = {item.location} />

))}
</div>
</section>
</main>


<Footer/>


</div>

  )

}

export default Search


export async function getServerSideProps(){
  const searchResults =  await fetch("https://links.papareact.com/isz").then(res => res.json());

  return {
    props: {
      searchResults,
    }
  };
}
