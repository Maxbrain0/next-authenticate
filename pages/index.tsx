import SEO from "../next-seo.config";
import {DefaultSeo} from "next-seo";
import Link from "next/link";
import Footer from '../src/components/global/Footer';

function Home(): JSX.Element {
  return (
    <main>
      <section>
        <div className="uk-container" >
          <DefaultSeo {...Object.assign(SEO, {
            title: `Home`,
          })}
          />
          <section className="uk-padding">
            <p>Home</p>
            <Link href="/auth">
              <button className="uk-button">Log in</button>
            </Link>
          </section>
        </div>
      </section>
      <Footer/>
    </main>

  );
}

export default Home;
