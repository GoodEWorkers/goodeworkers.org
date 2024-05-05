/* eslint-disable max-len */
import React from 'react';
import { Link } from 'gatsby';
import Articles from '../components/Landing/ArticlesSection';
import ArticleImg from '../images/ArticleImg.svg';
import ArticleImgLarge from '../images/ArticleImgLarge.svg';
import Fleche from '../assets/icons/fleche.svg';
import Video from '../images/video.svg';
import Reseaux from '../assets/icons/reseaux.svg';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ArticlePage() {
  const videos = [{ icon: Video, videoName: 'video' }];
  const articlesImg = [
    {
      img: ArticleImg,
      index: 1,
    },
    {
      img: ArticleImg,
      index: 2,
    },
  ];
  const articlesImg2 = [
    {
      img: ArticleImg,
      index: 1,
    },
    {
      img: ArticleImg,
      index: 2,
    },
    {
      img: ArticleImg,
      index: 3,
    },
  ];
  return (
    <>
      <Navbar />
      <main>
        <section className="text-white">
          <div className="text-white flex font-clash px-24 md:px-52 py-4 ">
            <Link
              to="/"
              className="text-white flex font-clash text-3xl items-center "
            >
              <Fleche />
              {'    '}
              blog
            </Link>
          </div>
          <div className="px-24 md:px-52 flex-col py-6 ">
            <h1 className="lg:text-8xl  md:text-6xl font-clash text-2xl w-full">
              Titre lorem ipsum dolor si amet consectetur adipiscing elit.
            </h1>
            <div className="flex-col items-center py-12 md:flex  ">
              <img src={ArticleImgLarge} alt="ArticleImg" className="w-full " />
              <div className="bg-black-light w-48 rounded-2xl md:absolute md:left-4 px-2 md:px-4 ">
                <div className="flex py-4">
                  <div className=" rounded-2xl z-0 border-white border md:border-1 mr-2 px-2">
                    tech
                  </div>
                  <div className=" rounded-2xl z-0 border-white border md:border-1 mr-2 px-2">
                    design
                  </div>
                </div>
                <section className=" w-4/6  pb-8 max-lg:w-full">
                  <div>
                    <p className="text-purple">writer</p>
                    <p className="py-1 md:py-4">Jean Michel Ipsum</p>
                  </div>
                  <div>
                    <p className="text-purple">reading time</p>
                    <p className="py-1 md:py-4">8min</p>
                  </div>
                  <div>
                    <p className="text-purple md:pb-4">share on </p>
                    <Reseaux />
                  </div>
                </section>
              </div>
            </div>
            <h2 className="text-xl py-12 font-semibold max-md:text-lg">
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
            {videos.map((video) => (
              <img
                key={video.videoName}
                src={video.icon}
                alt="Video"
                className="w-full m-auto py-12"
              />
            ))}
            <p className="text-lg font-semibold">
              1. At vero eos et accusamus et iusto odio dignissimos
            </p>
            <p className="pt-12">
              Ducimus qui blanditiis praesentium voluptatum deleniti atque
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
            <p className="italic p-12 max-md:p-6">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatur, vel illum qui dolorem eum
              fugiat quo voluptas nulla pariatur? that they cannot foresee the
              pain and trouble that are bound to ensue; and equal blame belongs
              to those who fail in their duty through weakness.
            </p>
            <div className="flex justify-between">
              {articlesImg.map((element) => (
                <img
                  key={element.index}
                  src={element.img}
                  alt="ArticleImg"
                  className="w-5/12 max-md:w-1/2"
                />
              ))}
            </div>
            <p className="py-12">
              2. At vero eos et accusamus et iusto odio dignissimos
            </p>
            <p>
              Ducimus qui blanditiis praesentium voluptatum deleniti atque
              corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia
              deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
              quidem rerum facilis est et expedita distinctio.
              <br />
              _ Nam libero tempore, cum soluta nobis est eligendi uod
              <br />
              _ Maxime placeat facere possimus, omnis voluptas assumenda est,
              omnis dolor repellendus
              <br />
              _ Temporibus autem quibusdam et aut officiis debitis aut
              rerum
            </p>
            <div className="flex py-12 justify-around pb-24 max-md:flex-col max-md:">
              {articlesImg2.map((element) => (
                <img
                  key={element.index}
                  src={element.img}
                  alt="ArticleImg"
                  className="max-md:py-4"
                />
              ))}
            </div>
          </div>
        </section>
        <Articles />
      </main>
      <Footer />
    </>
  );
}

export default ArticlePage;
