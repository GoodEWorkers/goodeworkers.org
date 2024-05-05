import React from 'react';
import { Link } from 'gatsby';
import BigRoundedLinkBtn from '../Common/BigRoundedLinkBtn';
import ArticleImg from '../../images/ArticleImg.svg';
import Arrow1 from '../../images/Arrow1.svg';
import Arrow2 from '../../images/Arrow2.svg';

function Articles() {
  const text = 'Voir tous nos ';
  const largerText = 'articles';
  const changeImg = (e: { currentTarget: { src: string; }; }) => {
    e.currentTarget.src = Arrow2;
  };
  const normalImg = (e: { currentTarget: { src: string; }; }) => {
    e.currentTarget.src = Arrow1;
  };
  const ArticleCards = [
    {
      icon: ArticleImg,
      title: 'Titre lorem ipsum dolor si amet consectetur adipiscing elit',
      writer: 'Jean Michel Lipsum',
      readingTime: '8min',
      tag: ['tech', 'design'],
    },
    {
      icon: ArticleImg,
      title: 'Titre lorem ipsum',
      writer: 'Jean Michel Lipsum',
      readingTime: '8min',
      tag: ['tech', 'design', 'design', 'loremipsum'],
    },
    {
      icon: ArticleImg,
      title: 'Titre lorem ipsum dolor si amet consectetur',
      writer: 'Jean Michel Lipsum',
      readingTime: '8min',
      tag: ['tech', 'design'],
    },
  ];
  return (
    <section className="bg-black-light text-white  relative -mt-12 mb-12 px-8 pt-12 lg:pt-32 pb-6 md:pb-16 lg:pb-28 rounded-xl sm:rounded-2xl lg:rounded-3xl lg:justify-between">
      <div className="flex justify-between items-center px-10 pb-16 max-md:px-0">
        <p className="w-2/4 text-4xl max-md:text-2xl">
          <span>Lorem</span>

          <span className=" font-semibold">
            {'  '}
            ipsum dolor
            {'  '}
          </span>

          <span>sit amet.</span>
        </p>
        <BigRoundedLinkBtn
          upperSmallText={text}
          bigBtmText={largerText}
          className="bg-purple text-black max-md:w-3/5"
          href="/article"
        />
      </div>

      <div className="flex w-10/12 m-auto max-xl:flex-col max-xl:items-center max-xl:w-1/2 ">
        {ArticleCards.map((article) => (
          <Link to="/article" key={article.title} className="w-4/5 my-4 max-xl:w-full">
            <div>
              <div className="flex">
                <img src={article.icon} alt="img" />
                <img src={Arrow1} alt="Arrow" onMouseEnter={changeImg} onMouseLeave={normalImg} className="max-sm:w-1/5 relative -top-10 right-10  md:-top-24 md:right-20 lg:right-24 lg:-top-28 xl:right-24 " />
              </div>
              <h2 className="font-clash font-semibold text-xl py-5 w-5/6 max-lg:w-full">
                {article.title}
              </h2>
              <section className="flex justify-between w-4/6 pb-8 max-lg:w-full">
                <div>
                  <p className="text-purple">writer</p>
                  <p>{article.writer}</p>
                </div>
                <div className="">
                  <p className="text-purple">reading time</p>
                  <p>{article.readingTime}</p>
                </div>
              </section>
              <div className="flex  w-5/6 max-md:flex-wrap">
                {article.tag.map((element) => (
                  <p
                    key={`${article.title}-${element}`}
                    className=" rounded-2xl z-0 border-white border md:border-1 mr-2 px-2"
                  >
                    {element}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Articles;
