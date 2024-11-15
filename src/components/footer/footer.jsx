import "./footer.css"
export function Footer () {
    return (
        <>
        <footer>
        <div class="footer-container"></div>
        <div class="footer-section">
          <img class="logo-footer" alt="Company Logo" src="/images/logo.jpg" />
          <p>We provide information about properties such as houses, villas, and apartments to help people find their dream home.</p>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
  
        <div class="footer-section-property">
          <h4>PROPERTY</h4>
          <p><a href="#">Discover</a></p>
          <p><a href="#">Our Partners</a></p>
          <p><a href="#">Property Recommendation</a></p>
        </div>
  
        <div class="footer-section-article">
          <h4>ARTICLE</h4>
          <p><a href="#">Eco Essentials</a></p>
          <p><a href="#">Green Living</a></p>
          <p><a href="#">Eco Tech</a></p>
        </div>
  
        <div class="footer-section-contact">
          <h4>CONTACT</h4>
          <p>2444 Royal Ln. Mesa, New Jersey 45463</p>
          <p>(671) 555-0110</p>
          <p><a href="mailto:info@ecosphere.com">info@ecosphere.com</a></p>
        </div>
  
        <div class="footer-background">
          <img class="group-child" alt="Footer Decor" src="/images/footer gr.png" />
        </div>
      </footer>
      </>
    )
}
