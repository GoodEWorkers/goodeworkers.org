/* eslint-disable max-len */
import React from 'react';
import { Link } from 'gatsby';
import Articles from '../components/Landing/ArticlesSection';
import ArticleImg from '../assets/icons/ArticleImg.svg';
import Fleche from '../assets/icons/fleche.svg';
import Video from '../assets/icons/video.svg';
import Reseaux from '../assets/icons/reseaux.svg';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ArticlePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="text-white">
          <Link to="/" className="text-white flex font-clash">
            <Fleche />
            Blog
          </Link>
          <div>
            <h1>Lorem ipsum dolor sit amet consectetur.</h1>
            <div className="flex">
              <div>
                <div className=" rounded-2xl z-0 border-white border md:border-1 mr-2 px-">
                  tech
                </div>
                <div className=" rounded-2xl z-0 border-white border md:border-1 mr-2 px-2">
                  design
                </div>
                <section className=" w-4/6 pb-8 max-lg:w-full">
                  <div>
                    <p className="text-purple">writer</p>
                    <p>Jean Michel Ipsum</p>
                  </div>
                  <div>
                    <p className="text-purple">reading time</p>
                    <p>8min</p>
                  </div>
                  <div>
                    <p className="text-purple">share on </p>
                    <Reseaux />
                  </div>
                </section>
              </div>
              <ArticleImg />
            </div>
            <h2>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur?
            </h2>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus id quod
              maxime placeat facere possimus, omnis voluptas assumenda est,
              omnis dolor repellendus. Temporibus autem quibusdam et aut
              officiis debitis aut rerum necessitatibus saepe eveniet ut et
              voluptates repudiandae sint et molestiae non recusandae. Itaque
              earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
              voluptatibus maiores alias consequatur aut perferendis doloribus
              asperiores repellat
            </p>
            <Video />
            <p>
              1. Ducimus qui blanditiis praesentium voluptatum deleniti atque
              corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia
              deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
              quidem rerum facilis est et expedita distinctio. Nam libero
              tempore, cum soluta nobis est eligendi optio cumque nihil impedit
              quo minus id quod maxime placeat facere possimus, omnis voluptas
              assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
              et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
              et voluptates repudiandae sint et molestiae non recusandae. Itaque
              earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
              voluptatibus maiores alias consequatur aut perferendis doloribus
              asperiores repellat
            </p>
            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur? that they cannot foresee the
              pain and trouble that are bound to ensue; and equal blame belongs
              to those who fail in their duty through weakness.
            </p>
            <div>
              <ArticleImg />
              <ArticleImg />
            </div>
            <p>
              2. At vero eos et accusamus et iusto odio dignissimos Ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. _ Nam libero tempore, cum
              soluta nobis est eligendi uod _ Maxime placeat facere possimus,
              omnis voluptas assumenda est, omnis dolor repellendus _ Temporibus
              autem quibusdam et aut officiis debitis aut rerum
            </p>
          </div>
          <div>
            <ArticleImg />
            <ArticleImg />
            <ArticleImg />
          </div>
        </section>
        <Articles />
      </main>
      <Footer />
    </>
  );
}

export default ArticlePage;
