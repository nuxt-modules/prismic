/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/logo.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('getting-started')}>Get Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
        className={props.className}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
          align={props.align}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const Install = () => (
      <Block layout="twoColumn">
        {[
          {
            content: `If you want to skip our [getting started guide](${docUrl('getting-started')}), just install \`prismic-nuxt\` with your favourite package manager. \n\n\`\`\`bash\n$ yarn add @nuxtjs/prismic\n\`\`\``,
            title: 'Quick Start',
          },
          {
            image: `${baseUrl}img/install.gif`,
            imageAlign: 'right',
          }
        ]}
      </Block>
      // <Container className="container--narrow" padding={['bottom']}>
      //   <h2>Quick Start</h2>
      //   <p>If you want to skip our <a href={docUrl('getting-started.html')}>getting started guide</a>, just install <code>prismic-nuxt</code> with your favourite package manager.</p>
      //   <code className="hljs css language-bash">$ yarn add @nuxtjs/prismic</code>
      // </Container>
    );

    const Features = () => (
      <Block layout="threeColumn" background="dark" align="left" className="pageEnd">
        {[
          {
            title: 'Batteries Included',
            content: `Easily access official Prismic JavaScript & Prismic DOM libraries in your Nuxt.js app. \n\n <a class="button" href="${docUrl('getting-started')}">Read More...</a>`
          },
          {
            title: 'Preview Mode',
            content: `Automatically add Prismic Previews to your site without additional configuration. \n\n <a class="button" href="${docUrl('preview')}">Read More...</a>`
          },
          {
            title: 'Compact Configuration',
            content: `Just add your Prismic repository endpoint and a link resolver and you're good to go. \n\n <a class="button" href="${docUrl('configuration')}">Read More...</a>`
          }
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Install />
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Index;
