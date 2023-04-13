<template>
  <div>
    <h1>Sebastian Tuyu</h1>

    <div class="abstract">
      <h2>Resume</h2>
    I’m a passionate software developer who loves creating and scale services
    to build a better world software-based. I’ve worked on Web 2.0 / Web 3.0
    developing software mainly as a full stack dev, I feel comfortable on the
    backend and frontend. I also have a natural ability for leading teams.
    </div>

    <nav role="navigation" class="toc">
      <h2>Contents</h2>
      <ol>
        <li>
          <a href="#experience">Experience</a>
          <ol>
            <li><a href="#exp1">Engineer Manager</a></li>
            <li><a href="#exp2">Backend Typescript</a></li>
            <li><a href="#exp3">Fullstack Engineer</a></li>
            <li><a href="#exp4">Java Developer</a></li>
          </ol>
        </li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="">Projects</a></li>
        <li><a href="">Mentions</a></li>
      </ol>
    </nav>

    <h2 id="experience">Experience</h2>

    <div class="exp-frame" id="exp1">
      <h3>Engineer Manager</h3>
      <p>November 2022 - Now</p>
      <p class="business"><b>Smash Media</b></p>
    Decision making at architecture level to the applications, provide technical
    feedback to the developers and keeping track of their performance progress.
    1-1 meetings and code review of issues among the mono-repository applications.
    </div>

    <div class="exp-frame" id="exp2">
      <h3>Backend Typescript Developer</h3>
      <p>February 2022 - November 2022</p>
      <p class="business">Smash Media</p>
    Design and implementation of highly-scalable backend systems using
    Node.js with Typescript. Design and migration of Javascript to newer ver-
    sions and implementation of new standards to have cleaner code across the
    mono repository. Create new features using Nest.js, Fastify with MongoDB.
    Managing AWS infrastructure to improve CI/CD using IaC with pulumi and
    Circle CI.
    </div>

    <div class="exp-frame" id="exp3">
      <h3>Software Engineer Intern</h3>
    <p>September 2021 - February 2022</p>
    <p class="business">Torre</p>
    Development of high-quality web-apps: scalable, fast-response, cross-
    browser, and cross-device. Continually suggesting and implementing im-
    provements to existing code base with Typescript and Scala using Play and
    VueJs frameworks.
    </div>

    <div class="exp-frame" id="exp4">
      <h3>Java Developer</h3>
      <p>February 2021 - September 2021</p>
      <p class="business">Wayakna</p>
    Design and development of applications using Spring Boot with Java.
    Deployment of applications into AWS with the integration of DevOps services
    such as Docker and GitLab. Use of TDD/BDD. Testing with JUnit and
    Mockito.
    </div>

    <h2 id="skills">Skills</h2>

    <table>
      <thead>
          <tr>
            <th scope="col">
              Tech Stack
            </th>
            <th scope="col">
              Skills/Projects associated
            </th>
          </tr>
      </thead>
      <tr>
        <th scope="row">
          Backend Development
        </th>
        <td scope="row">
          <p class="skills">
            <font-awesome-icon
              :icon="['fab', 'js-square']"
              size="3x"
            />
            <font-awesome-icon
              :icon="['fab', 'node']"
              size="3x"
            />
            <font-awesome-icon
              :icon="['fab', 'docker']"
              size="3x"
            />
            <font-awesome-icon
              :icon="['fab', 'python']"
              size="3x"
            />
          </p>
          <p>
            Experienced in developing and maintaining backend systems, including databases, APIs, and microservices. Proficient in agile software development methodologies and collaborating with cross-functional teams.
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">
          Frontend Development
        </th>
        <td scope="row">
           <p class="skills">
            <font-awesome-icon
              :icon="['fab', 'react']"
              size="3x"
            />
            <font-awesome-icon
              :icon="['fab', 'vuejs']"
              size="3x"
            />
            <font-awesome-icon
              :icon="['fab', 'sass']"
              size="3x"
            />
            <font-awesome-icon
              :icon="['fab', 'figma']"
              size="3x"
            />
          </p>
          <p>
            Proficient in responsive web design and ensuring cross-browser compatibility.
            Experienced in developing and maintaining frontend systems with multiple frameworks like
            ReactJs or Vuejs, including web and mobile applications.
            Experience improving SEO and fast loading pages.
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">
          Systems Architecture
        </th>
        <td scope="row">
          <p class="skills">
            <font-awesome-icon
              :icon="['fab', 'aws']"
              size="3x"
            />
            <font-awesome-icon
              :icon="['fab', 'linux']"
              size="3x"
            />
            <font-awesome-icon icon="fa-brands fa-cloudflare" size="3x"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 300 300" fill="none">
              <circle cx="150" cy="150" r="150" fill="black"/>
              <path d="M97.0239 205.745C103.293 202.125 103.304 190.406 97.0471 179.569C90.7905 168.733 80.6361 162.882 74.3666 166.502C68.0971 170.122 68.0867 181.841 74.3433 192.678C80.5999 203.514 90.7544 209.364 97.0239 205.745Z" fill="#F26E7E"/>
              <path d="M225.253 192.693C231.509 181.857 231.499 170.138 225.229 166.518C218.96 162.898 208.806 168.748 202.549 179.585C196.292 190.421 196.303 202.14 202.572 205.76C208.842 209.38 218.996 203.53 225.253 192.693Z" fill="#8A3391"/>
              <path d="M139.748 230.446C146.018 226.826 146.028 215.107 139.772 204.27C133.515 193.434 123.361 187.584 117.091 191.203C110.822 194.823 110.811 206.542 117.068 217.379C123.325 228.215 133.479 234.066 139.748 230.446Z" fill="#F26E7E"/>
              <path d="M182.536 217.354C188.793 206.517 188.783 194.798 182.513 191.178C176.244 187.559 166.089 193.409 159.833 204.245C153.576 215.082 153.586 226.801 159.856 230.421C166.125 234.041 176.28 228.19 182.536 217.354Z" fill="#8A3391"/>
              <path d="M149.771 88.2169C162.284 88.2169 172.428 82.3481 172.428 75.1085C172.428 67.8689 162.284 62 149.771 62C137.257 62 127.113 67.8689 127.113 75.1085C127.113 82.3481 137.257 88.2169 149.771 88.2169Z" fill="#F7BF2A"/>
              <path d="M97.0092 156.365C103.279 152.746 103.289 141.027 97.0325 130.19C90.7759 119.354 80.6214 113.503 74.3519 117.123C68.0824 120.743 68.072 132.462 74.3286 143.298C80.5853 154.135 90.7397 159.985 97.0092 156.365Z" fill="#F26E7E"/>
              <path d="M107.055 112.852C119.569 112.852 129.713 106.983 129.713 99.7438C129.713 92.5042 119.569 86.6353 107.055 86.6353C94.542 86.6353 84.3979 92.5042 84.3979 99.7438C84.3979 106.983 94.542 112.852 107.055 112.852Z" fill="#F7BF2A"/>
              <path d="M225.228 143.326C231.484 132.489 231.474 120.77 225.205 117.15C218.935 113.531 208.781 119.381 202.524 130.217C196.267 141.054 196.278 152.773 202.547 156.393C208.817 160.013 218.971 154.162 225.228 143.326Z" fill="#8A3391"/>
              <path d="M192.543 112.852C205.056 112.852 215.2 106.983 215.2 99.7438C215.2 92.5042 205.056 86.6353 192.543 86.6353C180.03 86.6353 169.886 92.5042 169.886 99.7438C169.886 106.983 180.03 112.852 192.543 112.852Z" fill="#F7BF2A"/>
              <path d="M139.735 181.067C146.004 177.447 146.015 165.728 139.758 154.892C133.501 144.055 123.347 138.205 117.078 141.825C110.808 145.444 110.798 157.164 117.054 168C123.311 178.837 133.465 184.687 139.735 181.067Z" fill="#F26E7E"/>
              <path d="M182.512 167.986C188.769 157.15 188.758 145.43 182.489 141.811C176.219 138.191 166.065 144.041 159.808 154.878C153.551 165.714 153.562 177.433 159.831 181.053C166.101 184.673 176.255 178.823 182.512 167.986Z" fill="#8A3391"/>
              <path d="M149.771 137.543C162.284 137.543 172.428 131.674 172.428 124.434C172.428 117.195 162.284 111.326 149.771 111.326C137.257 111.326 127.113 117.195 127.113 124.434C127.113 131.674 137.257 137.543 149.771 137.543Z" fill="#F7BF2A"/>
            </svg>
          </p>
          <p>
            Design and implementation of multiple architecture systems such as monlithic and micro-services,
            scaling services, and multi-region deployment for applications. Migration and administration of
            databases like MongoDB, SQL, Redis.
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<style>
  .exp-frame .business {
    margin: 0.05em 0;
    font-weight: bold;
  }

  svg {
    margin: 0.2em 0.35em;
  }

  td {
    padding-left: 2rem;
  }

  @media screen and (max-width: 550px) {
    .skills {
      text-align: center;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      justify-items: center;
    }
  }

  @media screen and (min-width: 551px) {
    .skills {
      text-align: center;
    }
  }

</style>

<script lang="ts">
import Vue from 'vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faJsSquare,
  faDocker,
  faNode,
  faStripe,
  faAws,
  faReact,
  faVuejs,
  faLinux,
  faSass,
  faPython,
  faFigma,
  faCloudflare
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

[
  faJsSquare,
  faFigma,
  faNode,
  faJsSquare,
  faDocker,
  faStripe,
  faAws,
  faReact,
  faVuejs,
  faLinux,
  faSass,
  faPython,
  faCloudflare
].forEach((n) => library.add(n));

export default Vue.extend({
  head: {
    title: 'Sebastian Tuyu | Resume'
  },
  components: {
    FontAwesomeIcon
  }
})
</script>
