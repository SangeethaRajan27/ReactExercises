function AboutUs(props){
    return(<center><div><b>Contact Us</b><br />
    {props.companyName}<br />
    {props.address}
    <a href="mailto:aboutus@gavstech.com?subject=About us">
        <button>About Us</button>
    </a>
    {/* this will defaultly open the mail app with composing to given mailid and subject */}
    </div></center>)
}
export default AboutUs;