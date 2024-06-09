/* eslint-disable max-len */
import React from 'react';
import { Link } from 'gatsby';
import parse from 'html-react-parser';
import Articles from '../components/Landing/ArticlesSection';
import '../styles/articlePage.css';
import Fleche from '../assets/icons/fleche.svg';
import Reseaux from '../assets/icons/reseaux.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ArticlePage() {
  const payload = {
    data: {
      article: {
        locale: 'fr',
        slug: 'un-premier-article-example',
        tags: [
          'marketing',
          'engineering',
        ],
        title: 'Titre lorem ipsum dolor si amet consectetur adipiscing elit.',
        updatedAt: '2024-04-21T05:14:12.495711+00:00',
        author: {
          lastName: 'Raduly',
          firstName: 'Richard',
          id: 'clv924m7e07x607w45fwmxfnb',
        },
        createdAt: '2024-04-21T05:05:19.177792+00:00',
        content: {
          html: "<p></p><img src=\"https://eu-central-1-shared-euc1-02.graphassets.com/clv4w1nk80b3307w2881491kq/clv928zla0k4j07un7ght6lfu\" alt=\"Logo_long_hd.png\" title=\"Logo_long_hd.png\" width=\"680\" height=\"340\" /><img src=\"https://eu-central-1-shared-euc1-02.graphassets.com/clv4w1nk80b3307w2881491kq/clv928zla0k4j07un7ght6lfu\" alt=\"Logo_long_hd.png\" title=\"Logo_long_hd.png\" width=\"680\" height=\"340\" /><p>Il est important de prendre soin du patient, d’être suivi par le patient, mais cela arrivera à un moment tel qu’il y aura beaucoup de travail et de douleur. Nibh nisl le condiment qui est empoisonné par le condiment de la vie. Les fans du jeu n&#39;ont besoin que d&#39;un clavier. Un grand vestibule bien équipé. À moins que quelqu&#39;un ne soit plus un entraîneur qu&#39;un eleifend. Comment peut-on faire ça ? A moins que l&#39;un des élus ne sache comment étudier la vie des tireurs. <strong>Il poursuit et déclenche jusqu&#39;à</strong> détester les enf<a target='_blank' title=\"https://google.com\" href=\"https://google.com\">ants pour le reste de sa vie. Duis ultricies lac mais moche tincidunt. Tortor chez l&#39;auteur du pot maintenant cela fai</a>t peur. Car je dois boire au mauvais goût du football. Le temps de la vie que les enfants n&#39;ont pas. La vie entière a juste besoin d’une grande chaleur. Ou quel élément l&#39;oreiller n&#39;est même pas. Le plat principal de la succession du salarié a été visé par les tireurs embusqués. Mais désormais, l’élément vie sera pris en charge. Il n&#39;a besoin ni de carquois ni d&#39;ultrice pour orner le bronze. Ou un pulvinar élite seleccrice mauris pellentesque. Urne de lit vallée à deux vallées.</p><p></p><ol><li><div><em>Dans la vie, la masse laide mais un élément. L&#39;élément de l&#39;oreiller n&#39;est pas non plus aussi bon que celui du lac. </em></div></li><li><div><em>Tout le temps est attendu maintenant ou le sourire. </em></div></li><li><div><em>C&#39;est juste pur dans le soft maintenant mais c&#39;est toujours un sourire. </em></div></li></ol><p><em>Mécène ultricies mi eget mauris pharetra et ultrices neque nare. La douleur de la maladie n’est pas un sourire. Moche besoin mais urne de temps et carquois de masse. Ce n’est pas seulement qu’il est important d’être facile même pendant la période clinique. Il est très important que le client puisse répondre à ses besoins. Cette démarche a mis à néant certaines des craintes de mon Elifend.</em></p><p></p><pre><code>Il ne nécessite pas de claviériste. Boire de la bière au lit. Certains s’attendaient à boire l’arc de la vie, l’élément vie sera désormais pris en charge. On ne s’attend pas à des rires à l’heure du basket. J&#39;ai lu l&#39;ultris eros dans le cours. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nola. Et il s’attendait à la faim et au besoin horrible. Diam volutpat commodore mais la nécessité du besoin du phasellus fringial. Il veut que les flèches soient aussi pures qu&#39;un oreiller. Qui peut mettre du chocolat dans sa bouche ?</code></pre><p></p>",
          markdown: "\n\n![Logo_long_hd.png](https://eu-central-1-shared-euc1-02.graphassets.com/clv4w1nk80b3307w2881491kq/clv928zla0k4j07un7ght6lfu \"Logo_long_hd.png\")\n\nIl est important de prendre soin du patient, d’être suivi par le patient, mais cela arrivera à un moment tel qu’il y aura beaucoup de travail et de douleur. Nibh nisl le condiment qui est empoisonné par le condiment de la vie. Les fans du jeu n'ont besoin que d'un clavier. Un grand vestibule bien équipé. À moins que quelqu'un ne soit plus un entraîneur qu'un eleifend. Comment peut-on faire ça ? A moins que l'un des élus ne sache comment étudier la vie des tireurs. **Il poursuit et déclenche jusqu'à** détester les enf[ants pour le reste de sa vie. Duis ultricies lac mais moche tincidunt. Tortor chez l'auteur du pot maintenant cela fai](https://google.com \"https://google.com\")t peur. Car je dois boire au mauvais goût du football. Le temps de la vie que les enfants n'ont pas. La vie entière a juste besoin d’une grande chaleur. Ou quel élément l'oreiller n'est même pas. Le plat principal de la succession du salarié a été visé par les tireurs embusqués. Mais désormais, l’élément vie sera pris en charge. Il n'a besoin ni de carquois ni d'ultrice pour orner le bronze. Ou un pulvinar élite seleccrice mauris pellentesque. Urne de lit vallée à deux vallées.\n\n\n\n1.  _Dans la vie, la masse laide mais un élément. L'élément de l'oreiller n'est pas non plus aussi bon que celui du lac._\n2.  _Tout le temps est attendu maintenant ou le sourire._\n3.  _C'est juste pur dans le soft maintenant mais c'est toujours un sourire._\n\n_Mécène ultricies mi eget mauris pharetra et ultrices neque nare. La douleur de la maladie n’est pas un sourire. Moche besoin mais urne de temps et carquois de masse. Ce n’est pas seulement qu’il est important d’être facile même pendant la période clinique. Il est très important que le client puisse répondre à ses besoins. Cette démarche a mis à néant certaines des craintes de mon Elifend._\n\n\n\n    Il ne nécessite pas de claviériste. Boire de la bière au lit. Certains s’attendaient à boire l’arc de la vie, l’élément vie sera désormais pris en charge. On ne s’attend pas à des rires à l’heure du basket. J'ai lu l'ultris eros dans le cours. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nola. Et il s’attendait à la faim et au besoin horrible. Diam volutpat commodore mais la nécessité du besoin du phasellus fringial. Il veut que les flèches soient aussi pures qu'un oreiller. Qui peut mettre du chocolat dans sa bouche ?\n\n\n",
        },
        coverPicture: {
          height: 1067,
          fileName: '9070079.jpg',
          url: 'https://eu-central-1-shared-euc1-02.graphassets.com/clv4w1nk80b3307w2881491kq/clv92kfn4100607unhrcwafxs',
          width: 1600,
        },
      },
    },
  };
  return (
    <>
      <Navbar />
      <main>
        <section className="article text-white">
          <div className="text-white flex font-clash px-4 md:px-52 py-4 ">
            <Link
              to="/"
              className="text-white flex font-clash text-xl items-center md:text-3xl "
            >
              <Fleche />
              {'    '}
              blog
            </Link>
          </div>
          <div className="px-4 md:px-52 flex-col py-6 ">
            <h1 className="font-clash">{payload.data.article.title}</h1>
            <div className="flex-col items-center py-12 md:flex ">
              <img src={payload.data.article.coverPicture.url} alt="ArticleImg" className="rounded-2xl" />
              <div className="bg-black-light md:w-48 rounded-2xl md:absolute md:left-4 px-2 md:px-4 m-auto w-full">
                <div className="flex py-4 flex-wrap">
                  {payload.data.article.tags.map((tag) => (
                    <div className=" rounded-lg border-white border md:border-1 mr-2 px-2 m-2 font-clash font-semibold" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
                <section className=" w-4/6  pb-8 max-lg:w-full">
                  <div className="border-b-2 mb-2">
                    <p className="text-purple">writer</p>
                    <p className="py-1 md:py-4">Jean Michel Ipsum</p>
                  </div>
                  <div className="border-b-2 mb-2">
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
            <div className="articleBody">
              {parse(payload.data.article.content.html)}
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
