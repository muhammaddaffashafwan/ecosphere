import "./footer.css"
export function Footer () {
    return (
        <>
        <footer>
        <div className="footer-container"></div>
        <div className="footer-section">
          <img className="logo-footer" alt="Company Logo" src="/images/logo.jpg" />
          <p>We provide information about properties such as houses, villas, and apartments to help people find their dream home.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
  
        <div className="footer-section-property">
          <h4>PROPERTY</h4>
          <p><a href="#">Discover</a></p>
          <p><a href="#">Our Partners</a></p>
          <p><a href="#">Property Recommendation</a></p>
        </div>
  
        <div className="footer-section-article">
          <h4>ARTICLE</h4>
          <p><a href="#">Eco Essentials</a></p>
          <p><a href="#">Green Living</a></p>
          <p><a href="#">Eco Tech</a></p>
        </div>
  
        <div className="footer-section-contact">
          <h4>CONTACT</h4>
          <p>2444 Royal Ln. Mesa, New Jersey 45463</p>
          <p>(671) 555-0110</p>
          <p><a href="mailto:info@ecosphere.com">info@ecosphere.com</a></p>
        </div>
  
        <div className="footer-background">
          <img className="group-child" alt="Footer Decor" src="/images/footer gr.png" />
        </div>
      </footer>
      </>
    )
}
