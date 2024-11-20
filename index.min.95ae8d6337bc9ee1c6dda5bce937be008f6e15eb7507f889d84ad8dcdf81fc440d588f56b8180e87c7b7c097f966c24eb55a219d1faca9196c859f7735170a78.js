var suggestions=document.getElementById("suggestions"),userinput=document.getElementById("userinput");document.addEventListener("keydown",inputFocus);function inputFocus(e){e.keyCode===191&&(e.preventDefault(),userinput.focus()),e.keyCode===27&&(userinput.blur(),suggestions.classList.add("d-none"))}document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=suggestions.querySelectorAll("a"),o=[...s],t=o.indexOf(document.activeElement);let n=0;e.keyCode===38?(e.preventDefault(),n=t>0?t-1:0,s[n].focus()):e.keyCode===40&&(e.preventDefault(),n=t+1<o.length?t+1:t,s[n].focus())}(function(){var e=new FlexSearch({preset:"score",cache:!0,doc:{id:"id",field:["title","description","content"],store:["href","title","description","tags"]}}),n=[{id:0,href:"/docs/broadcasting/obs/",title:"OBS/Streamlabs OBS",description:"OBS is a popular piece of free software for live streaming.",content:`<p>OBS is a popular piece of free software that will get you streaming from your own computer right away.</p>
<ol>
<li>Install <a href="https://obsproject.com/">OBS</a> or <a href="https://streamlabs.com/">Streamlabs OBS</a> and get it working with your local setup.</li>
<li>Open OBS Settings and go to &ldquo;Stream&rdquo;.</li>
<li>Select &ldquo;Custom&hellip;&rdquo; as the service.</li>
<li>Enter the URL of the server running your streaming service in the format of rtmp://myserver.net/live.</li>
<li>Enter your &ldquo;Stream Key&rdquo; that matches a stream key defined in the Owncast admin. By default there is a single stream key that matches the default admin password of <code>abc123</code> but this should be changed.</li>
<li>Start the server.</li>
<li>Press &ldquo;Start Streaming&rdquo; (OBS) or &ldquo;Go Live&rdquo; (Streamlabs) on OBS.</li>
</ol>
`},{id:1,href:"/docs/broadcasting/restream/",title:"Restream.io",description:"Restream is a commercial service to stream to multiple locations at once.",content:`<p>You must be a paid user of <a href="http://restream.io">Restream</a> to point to your Owncast instance as a destination &ldquo;channel&rdquo;.</p>
<ol>
<li>
<p>Login and go to the &ldquo;Add Channel&rdquo; screen.


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/restream1.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div></p>
</li>
<li>
<p>Select &ldquo;Custom RTMP&rdquo;


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/restream2.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div></p>
</li>
<li>
<p>Add your server information in the format of <code>rtmp://myserver/live</code> for the RTMP URL and your Stream Key.


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/restream3.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div></p>
</li>
</ol>
`},{id:2,href:"/docs/broadcasting/zoom/",title:"Zoom",description:"Zoom is a video conferencing provider.",content:`<p><a href="https://zoom.us/">Zoom</a> offers to stream your meeting to a livestreaming service like Owncast. Please mind that some changes might need to be done by your Zoom administrator.</p>
<ol>
<li>Set up Owncast and configure it by your choosing. Since the RMTP stream comes directly from the Zoom servers, at least the RMTP port should be available from the internet.</li>
<li>Allow live streaming for the user account. In <a href="https://zoom.us/profile/setting">zoom.us/profile/setting</a>, scroll down to &ldquo;Allow live streaming meetings&rdquo; and activate <em>Custom Live Streaming Service</em>:

  
  
      <figure >
          
              <img src="/docs/img/zoom-activate-for-account.png" width="100%" loading="lazy" />
              
          
      </figure>
      </li>
<li>Schedule a meeting using the website and save it. Zoom will redirect you to a &ldquo;Manage meeting&rdquo; page which has a Live Streaming section at the very bottom. Click on the &ldquo;configure live stream settings&rdquo; link:

  
  
      <figure >
          
              <img src="/docs/img/zoom-manage-meeting.png" width="100%" loading="lazy" />
              
          
      </figure>
      </li>
<li>Fill in your Owncast server information. The &ldquo;live streaming page URL&rdquo; should be the Owncast Frontend, since Zoom will link to it from the meeting.

  
  
      <figure >
          
              <img src="/docs/img/zoom-server-settings.png" width="100%" loading="lazy" />
              
          
      </figure>
      </li>
<li>Once the meeting is started, click on &ldquo;More&rdquo; in the menu bar and then &ldquo;Livestream to Custom service&rdquo;. Zoom will open a browser window and then redirect you to the Owncast frontend (or whichever URL you specified).</li>
</ol>
<p>The instructions for Webinars and Personal Meeting Rooms are similar, <a href="https://support.zoom.us/hc/en-us/articles/115001777826-Live-Streaming-Meetings-or-Webinars-Using-a-Custom-Service">see Zoom&rsquo;s support page</a> for more information.</p>
`},{id:3,href:"/docs/sslproxies/caddy/",title:"Caddy",description:"Caddy is possibly the fastest way to setup a SSL proxy.",content:`<p><a href="https://caddyserver.com/">Caddy</a> is the fastest way to setup a SSL reverse proxy with a free certificate from <a href="https://letsencrypt.org/">Let&rsquo;s Encrypt</a>.</p>
<p>While we will try to walk you through some installation steps <strong>it is highly suggested you follow Caddy&rsquo;s <a href="https://caddyserver.com/docs/install">Install options</a> and <a href="https://caddyserver.com/docs/quick-starts/reverse-proxy">Reverse Proxy Quickstart</a> for more documentation, examples and detailed information</strong>. Caddy is a well documented quality piece of software that you should get familiar with if you need to run a SSL reverse proxy.</p>
<h2 id="1-make-sure-you-dont-have-other-web-servers-running">1. Make sure you don&rsquo;t have other web servers running.</h2>
<p>If you are running other pieces of web server software such as Apache or NGINX using port 80 or 443 then you won&rsquo;t be able to continue with this Caddy install. Either remove the other pieces of software or read up on how to make them live in harmony.</p>
<h2 id="2-install-caddy">2. Install Caddy</h2>
<p>Depending on your system there may be different options on installing. Using APT is suggested if it&rsquo;s supported on your machine.</p>
<details>
  <summary>Using APT (recommended) </summary>
<p>Installing this package automatically starts and runs Caddy for you as a systemd service so it will automatically run Caddy each time you start your machine.
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line"><span class="cl">sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
</span></span><span class="line"><span class="cl">curl -1sLf <span class="s1">&#39;https://dl.cloudsmith.io/public/caddy/stable/gpg.key&#39;</span> <span class="p">|</span> sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
</span></span><span class="line"><span class="cl">curl -1sLf <span class="s1">&#39;https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt&#39;</span> <span class="p">|</span> sudo tee /etc/apt/sources.list.d/caddy-stable.list
</span></span><span class="line"><span class="cl">sudo apt update
</span></span><span class="line"><span class="cl">sudo apt install caddy</span></span></code></pre></div></p>
<p><a href="https://caddyserver.com/docs/install#debian-ubuntu-raspbian">Read the Caddy install steps for using apt</a> for more details.</p>
</details>
<details>
  <summary>Download manually</summary>
<ol>
<li><a href="https://github.com/caddyserver/caddy/releases">Visit the releases page</a> and expand the &ldquo;assets&rdquo; section.</li>
<li>Find the version for your platform and operating system.</li>
<li>Unarchive the file: <code>tar -xvzf caddy_2.3.0_linux_amd64.tar.gz</code></li>
<li>You&rsquo;re likely to want to setup Caddy as a system service to auatomatically start in the background.  <a href="https://caddyserver.com/docs/install#linux-service">Learn how to do this</a>.
<a href="https://caddyserver.com/docs/install#static-binaries">Read the Caddy download page for more details.</a></li>
</ol>
</details>
<h2 id="3-run-caddy-as-a-reverse-proxy">3. Run Caddy as a reverse proxy</h2>
<details>
  <summary>Single command line</summary>
<p>It offers automatic configuration of HTTPS with a single command.</p>
<p><button class="btn-clipboard btn btn-sm btn-link" data-clipboard-text="caddy reverse-proxy --from owncast.mydomain.com --to 127.0.0.1:8080"><span class="copy-status"></span></button>

<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line"><span class="cl">caddy reverse-proxy --from owncast.mydomain.com --to 127.0.0.1:8080</span></span></code></pre></div></p>
<p>Replace <code>owncast.mydomain.com</code> with the public hostname of your Owncast server like <code>watch.owncast.online</code> for example.</p>
<p><a href="https://caddyserver.com/docs/quick-starts/reverse-proxy">Read the Caddy reverse proxy documentation for more details.</a></p>
</details>
<details>
  <summary>Caddyfile</summary>
<p>The <a href="https://caddyserver.com/docs/caddyfile">Caddyfile</a> is Caddy&rsquo;s config file.</p>
<p>Add to your Caddyfile:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-caddyfile" data-lang="caddyfile"><span class="line"><span class="cl"><span class="gh">owncast.mydomain.com</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="k">encode</span> <span class="s">gzip</span>
</span></span><span class="line"><span class="cl"><span class="k">reverse_proxy</span> <span class="n">127.0.0.1</span><span class="p">:</span><span class="mi">8080</span>
</span></span><span class="line"><span class="cl"><span class="k">tls</span> <span class="s">webmaster@mydomain.com</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span></span></span></code></pre></div>
<p>Replace <code>owncast.mydomain.com</code> with the public hostname of your Owncast server like <code>watch.owncast.online</code> for example.</p>
</details>
<hr>
<p>If you specify <code>owncast.mydomain.com</code> without a protocol or a port, it will attempt to use the default <code>http</code> and <code>https</code> ports (80 and 443). Since these are <a href="https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html#:~:text=Priviliged%20ports,has%20put%20up%20for%20you."><em>privileged ports</em></a>, you will need to run caddy with <code>sudo</code> or as <code>root</code>.</p>
<h2 id="4-run-owncast-normally">4. Run Owncast normally</h2>
<p>Continue to run Owncast on port 8080.</p>
<h2 id="5-access-owncast-through-the-proxy">5. Access Owncast through the proxy</h2>
<hr>
<p>You should now be able to access your Owncast server by visiting <a href="https://owncast.mydomain.com">https://owncast.mydomain.com</a> instead of <a href="http://owncast.mydomain.com:8080">http://owncast.mydomain.com:8080</a>.</p>
<p>Replace <code>owncast.mydomain.com</code> with the public hostname of your Owncast server like <code>watch.owncast.online</code> for example.</p>
`},{id:4,href:"/docs/broadcasting/ffmpeg/",title:"ffmpeg",description:"ffmpeg is a leading command line tool for processing video.",content:`<p>Streaming with ffmpeg is quite easy. You can stream any connected webcam or HDMI grabber that appears in <code>/dev/video*</code> and incoming alsa audio devices. In this example, the <code>/dev/video2</code> video device and the <code>hw:1,0</code> alsa audio device are used:</p>
<p><button class="btn-clipboard btn btn-sm btn-link" data-clipboard-text="ffmpeg -f alsa -ac 2 -i hw:1,0 -thread_queue_size 64 -f v4l2 -framerate 60 -video_size 1280x720 -input_format yuyv422 -i /dev/video2 -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k -vf &#34;format=yuv420p&#34; -g 60 -c:a aac -b:a 128k -ar 44100 -f flv rtmp:///live/"><span class="copy-status"></span></button>

<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line"><span class="cl">ffmpeg -f alsa -ac <span class="m">2</span> -i hw:1,0 -thread_queue_size <span class="m">64</span> <span class="se">\\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  -f v4l2 -framerate <span class="m">60</span> -video_size 1280x720 -input_format yuyv422 -i /dev/video2 <span class="se">\\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k <span class="se">\\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  -vf <span class="s2">&#34;format=yuv420p&#34;</span> -g <span class="m">60</span> -c:a aac -b:a 128k -ar <span class="m">44100</span> <span class="se">\\
</span></span></span><span class="line"><span class="cl"><span class="se"></span>  -f flv rtmp://&lt;ip-of-your-server&gt;/live/&lt;your-streaming-key&gt;</span></span></code></pre></div></p>
`},{id:5,href:"/docs/sslproxies/haproxy/",title:"HAProxy",description:"HAproxy is a well known performant reverse proxy.",content:`<p>Setup websocket on HAproxy could be tricky. Here is a working configuration:</p>
<p><code>haproxy.cfg</code></p>
<pre tabindex="0"><code>global
  log /dev/log  local0
	chroot /var/lib/haproxy
	user haproxy
	group haproxy
	daemon

	# Default SSL material locations
	ca-base /etc/ssl/certs
	crt-base /etc/ssl/private

	# See: https://ssl-config.mozilla.org/#server=haproxy&amp;server-version=2.0.3&amp;config=intermediate
  ssl-default-bind-ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
  ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
  ssl-default-bind-options ssl-min-ver TLSv1.2 no-tls-tickets
  nbproc  4
  maxconn 16384

defaults
    	log global
        mode http
    	option httplog
        timeout tunnel  1h
        timeout client  5s
        timeout server  60s
        timeout connect 5s
        timeout queue 5s

frontend tls
  bind :443 accept-proxy ssl crt /etc/haproxy/certs ssl-min-ver TLSv1.2 

  acl is_owncast hdr(host) -i &lt;your.owncast.hostname.tld&gt;
  acl is_websocket hdr(Upgrade) -i WebSocket

  use_backend owncast if is_owncast !is_websocket
  # use a specific backend for websockets
  use_backend owncastws if is_owncast is_websocket

backend owncast
  mode http
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  option forwardfor
  server server1 &lt;owncast_ip_or_hostname&gt;:&lt;owncast_port&gt; check

backend owncastws
  mode http
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  option forwardfor
  # added for websockets
  option http-server-close
  option forceclose
  no option httpclose
  server server1 &lt;owncast_ip_or_hostname&gt;:&lt;owncast_port&gt; check
</code></pre>`},{id:6,href:"/docs/sslproxies/lighttpd/",title:"lighttpd",description:"lighttpd is a lightweight option for SSL proxying.",content:`<p><a href="https://www.lighttpd.net/">lighttpd</a> is a light HTTP server which can be configured as a suitable reverse proxy via the <a href="https://redmine.lighttpd.net/projects/lighttpd/wiki/Mod_proxy">mod_proxy</a> module.</p>
<h2 id="ssl">SSL</h2>
<p>An implementation of <a href="https://redmine.lighttpd.net/projects/lighttpd/wiki/Docs_SSL">SSL support</a> via the mod_openssl module using OpenSSL may appear as follows:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lighttpd" data-lang="lighttpd"><span class="line"><span class="cl"><span class="nb">$SERVER</span><span class="p">[</span><span class="s2">&#34;socket&#34;</span><span class="p">]</span> <span class="o">==</span> <span class="s2">&#34;[::]:443&#34;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="k">ssl.engine</span> <span class="o">=</span> <span class="s2">&#34;enable&#34;</span>
</span></span><span class="line"><span class="cl"><span class="k">ssl.cipher-list</span> <span class="o">=</span> <span class="s2">&#34;HIGH&#34;</span>
</span></span><span class="line"><span class="cl"><span class="nb">$HTTP</span><span class="p">[</span><span class="s2">&#34;host&#34;</span><span class="p">]</span> <span class="o">==</span> <span class="s2">&#34;owncast.yourdomain.com&#34;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="k">ssl.pemfile</span> <span class="o">=</span> <span class="s2">&#34;/etc/letsencrypt/live/yourdomain.com/fullchain.pem&#34;</span>
</span></span><span class="line"><span class="cl"><span class="k">ssl.privkey</span> <span class="o">=</span> <span class="s2">&#34;/etc/letsencrypt/live/yourdomain.com/privkey.pem&#34;</span>
</span></span><span class="line"><span class="cl"><span class="k">ssl.dh-file</span> <span class="o">=</span> <span class="s2">&#34;/etc/letsencrypt/ssl-dhparams.pem&#34;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span></span></span></code></pre></div>
<h2 id="reverse-proxy">Reverse Proxy</h2>
<p>Proxying of incoming websocket connections is integrated with the module.</p>
<p>An example configuration for lighttpd might appear as follows:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lighttpd" data-lang="lighttpd"><span class="line"><span class="cl"><span class="nb">$HTTP</span><span class="p">[</span><span class="s2">&#34;host&#34;</span><span class="p">]</span> <span class="o">==</span> <span class="s2">&#34;owncast.yourdomain.com&#34;</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="k">proxy.forwarded</span> <span class="o">=</span> <span class="p">(</span> <span class="s2">&#34;host&#34;</span> <span class="o">=&gt;</span> <span class="m">1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="s2">&#34;proto&#34;</span> <span class="o">=&gt;</span> <span class="m">1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="s2">&#34;for&#34;</span> <span class="o">=&gt;</span> <span class="m">1</span><span class="p">,</span>
</span></span><span class="line"><span class="cl"><span class="s2">&#34;remote_user&#34;</span> <span class="o">=&gt;</span> <span class="m">1</span> <span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="c1"># Required for websocket (chat) forwarding:
</span></span></span><span class="line"><span class="cl"><span class="c1"></span>    <span class="k">proxy.header</span> <span class="o">=</span> <span class="p">(</span> <span class="s2">&#34;upgrade&#34;</span> <span class="o">=&gt;</span> <span class="s2">&#34;enable&#34;</span> <span class="p">)</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">}</span></span></span></code></pre></div>
`},{id:7,href:"/docs/sslproxies/nginx/",title:"NGINX",description:"NGINX is a very popular solution for SSL proxying.",content:`<p>NGINX is a popular web server used as a reverse proxy with free Let&rsquo;s Encrypt certificates. Visit the <a href="https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/">official documentation</a> for detailed instructions.</p>
<h2 id="websockets">Websockets</h2>
<p>People often look over the need to tell NGINX to proxy websockets correctly, leading to chat being disabled. Please read the quick <a href="https://nginx.org/en/docs/http/websocket.html">documentation by nginx around websocket support</a> to make sure you&rsquo;re doing it properly.</p>
<p>Essentially, you&rsquo;ll need to edit <code>/etc/nginx/nginx.conf</code> to add the following map block to the http section
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-nginx" data-lang="nginx"><span class="line"><span class="cl"><span class="k">http</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="kn">...</span>
</span></span><span class="line"><span class="cl"><span class="s">map</span> <span class="nv">$http_upgrade</span> <span class="nv">$connection_upgrade</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kn">default</span> <span class="s">upgrade</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="kn">&#39;&#39;</span>      <span class="s">close</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="kn">...</span>
</span></span><span class="line"><span class="cl"><span class="err">}</span></span></span></code></pre></div></p>
<p>You&rsquo;ll end up with a configuration that looks somewhat like the following when you&rsquo;re done setting up NGINX. The below should be added to <code>/etc/nginx/sites-available/my.site.com.conf</code> and enabled with <code>ln /etc/nginx/sites-available/my.site.com.conf /etc/nginx/sites-enabled/my.site.com.conf</code> and tested with <code>sudo nginx -t</code>, then restarted <code>sudo service nginx restart</code></p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-nginx" data-lang="nginx"><span class="line"><span class="cl"><span class="k">server</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">    <span class="kn">server_name</span> <span class="s">owncast.yourdomain.com</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="kn">listen</span> <span class="mi">443</span> <span class="s">ssl</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="kn">ssl_certificate</span> <span class="s">/etc/letsencrypt/live/yourdomain.com/fullchain.pem</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="kn">ssl_certificate_key</span> <span class="s">/etc/letsencrypt/live/yourdomain.com/privkey.pem</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="kn">include</span> <span class="s">/etc/letsencrypt/options-ssl-nginx.conf</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="kn">ssl_dhparam</span> <span class="s">/etc/letsencrypt/ssl-dhparams.pem</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">    <span class="kn">location</span> <span class="s">/</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">Host</span> <span class="nv">$host</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">X-Forwarded-Host</span> <span class="nv">$host</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">X-Forwarded-Server</span> <span class="nv">$host</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">X-Forwarded-Proto</span> <span class="nv">$scheme</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">X-Real-IP</span> <span class="nv">$remote_addr</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">X-Forwarded-For</span> <span class="nv">$proxy_add_x_forwarded_for</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_http_version</span> <span class="mi">1</span><span class="s">.1</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">Upgrade</span> <span class="nv">$http_upgrade</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_set_header</span> <span class="s">Connection</span> <span class="nv">$connection_upgrade</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">        <span class="kn">proxy_pass</span> <span class="s">http://127.0.0.1:8080</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">    <span class="p">}</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span></span></span></code></pre></div>
`},{id:8,href:"/docs/sslproxies/apache/",title:"Apache",description:"If you're already using Apache you can use it as a proxy.",content:`<p>Apache requires the most boilerplate configuration, but if you&rsquo;re already using Apache as a web server you can <a href="https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html">configure it as a reverse proxy</a> in front of your Owncast server to enable SSL.</p>
<p>Ensure required Apache modules are enabled using the <code>a2enmod</code> command.</p>
<pre tabindex="0"><code>$ sudo a2enmod proxy proxy_http proxy_wstunnel ssl
</code></pre><div class="highlight"><pre tabindex="0" class="chroma"><code class="language-ApacheConf" data-lang="ApacheConf"><span class="line"><span class="cl"><span class="nt">&lt;VirtualHost</span> <span class="s">\\*:80</span><span class="nt">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="nb">ServerName</span> live.example.com
</span></span><span class="line"><span class="cl"><span class="nb">ServerAdmin</span> admin@example.com
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nb">RewriteEngine</span> <span class="k">on</span>
</span></span><span class="line"><span class="cl">        <span class="nb">RewriteCond</span> %{SERVER_NAME} =live.example.com
</span></span><span class="line"><span class="cl">        <span class="nb">RewriteRule</span> ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nt">&lt;/VirtualHost&gt;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="c"># live-le-ssl.conf</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nt">&lt;IfModule</span> <span class="s">mod_ssl.c</span><span class="nt">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="nt">&lt;VirtualHost</span> <span class="s">*:443</span><span class="nt">&gt;</span>
</span></span><span class="line"><span class="cl">        <span class="nb">ServerName</span> live.example.com
</span></span><span class="line"><span class="cl">        <span class="nb">ServerAdmin</span> admin@example.com
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nb">ProxyRequests</span>       <span class="k">Off</span>
</span></span><span class="line"><span class="cl">        <span class="nb">ProxyPreserveHost</span>   <span class="k">On</span>
</span></span><span class="line"><span class="cl">        <span class="nb">AllowEncodedSlashes</span> NoDecode
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nt">&lt;Proxy</span> <span class="s">*</span><span class="nt">&gt;</span>
</span></span><span class="line"><span class="cl">          <span class="nb">Order</span> deny,allow
</span></span><span class="line"><span class="cl">          <span class="nb">Allow</span> from <span class="k">all</span>
</span></span><span class="line"><span class="cl">        <span class="nt">&lt;/Proxy&gt;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nb">ProxyPass</span>        / http://localhost:8080/
</span></span><span class="line"><span class="cl">        <span class="nb">ProxyPassReverse</span> / http://localhost:8080/
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nb">RequestHeader</span>    set X-Forwarded-Proto <span class="s2">&#34;https&#34;</span>
</span></span><span class="line"><span class="cl">        <span class="nb">RequestHeader</span>    set X-Forwarded-Port <span class="s2">&#34;443&#34;</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="c"># setup the proxy to forward websocket requests properly</span>
</span></span><span class="line"><span class="cl">        <span class="c"># (note: this proxy automatically converts the secure websocket (wss)</span>
</span></span><span class="line"><span class="cl">        <span class="c"># to a normal websocket and vice versa.</span>
</span></span><span class="line"><span class="cl">        <span class="nb">RewriteEngine</span> <span class="k">On</span>
</span></span><span class="line"><span class="cl">        <span class="nb">RewriteCond</span> %{HTTP:UPGRADE} ^WebSocket$           [NC,OR]
</span></span><span class="line"><span class="cl">        <span class="nb">RewriteCond</span> %{HTTP:CONNECTION} ^Upgrade$          [NC]
</span></span><span class="line"><span class="cl">        <span class="nb">RewriteRule</span> .* ws://127.0.0.1:8080%{REQUEST_URI}  [P,QSA,L]
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">        <span class="nb">SSLCertificateFile</span> <span class="sx">/path/to/fullchain.pem</span>
</span></span><span class="line"><span class="cl">        <span class="nb">SSLCertificateKeyFile</span> <span class="sx">/path/to/privkey.pem</span>
</span></span><span class="line"><span class="cl">        <span class="nb">Include</span> <span class="sx">/etc/letsencrypt/options-ssl-apache.conf</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="nt">&lt;/VirtualHost&gt;</span>
</span></span><span class="line"><span class="cl"><span class="nt">&lt;/IfModule&gt;</span></span></span></code></pre></div>
`},{id:9,href:"/docs/broadcasting/",title:"Broadcasting Software",description:"How you configure your broadcasting software can impact the quality and performance of your stream",content:`<h2 id="compatibility">Compatibility</h2>
<p>In general Owncast is compatible with any software that uses <code>RTMP</code> to broadcast to a remote server. <code>RTMP</code> is what all the major live streaming services use, so if you&rsquo;re currently using one of those it&rsquo;s likely that you can point your existing software at your Owncast instance instead.</p>
<p>However, we haven&rsquo;t tested with everything. So if you&rsquo;re using something specific <a href="https://github.com/owncast/owncast/issues/new">we&rsquo;d love to hear what software you&rsquo;re using and the results</a>. If you&rsquo;re finding yourself running into issues, we&rsquo;d love to help troubleshoot.</p>
<h2 id="pointing-your-software-to-owncast">Pointing your software to Owncast</h2>
<p>Most broadcasting software will have a way to specify a &ldquo;custom&rdquo; location as a RTMP endpoint. In this case you would specify <code>rtmp://yourserver/live</code> as the RTMP destination, specifying your streaming key where it asks for it. The default stream key is <code>abc123</code> but you should change this immediately after setting up Owncast.</p>
<p>If your software doesn&rsquo;t have a place to specify a streaming key you can simply append it to your RTMP location, for example: <code>rtmp://yourserver/live/abc123</code>.</p>
<h2 id="how-you-configure-your-broadcasting-software-matters">How you configure your broadcasting software matters</h2>
<p>You will want to configure your broadcasting software to match the highest quality you can offer your viewers. <strong>That means if your Owncast server can only handle 720p@2500k you should not configure your broadcasting software to send 1080p@6000k</strong>. The more conversion work you ask Owncast to do the more resources it will use on your server, making it even harder to offer the best qualities to your viewers.</p>
<p>Every server, environment, network speed and processing capacity is different. Just because you <em>want</em> to offer a certain quality doesn&rsquo;t mean your server can support it.</p>
<p>If you find yourself trying to squeeze better performance out of Owncast then try setting your broadcasting software to a lower quality as well as lowering the quality in your Owncast instance.</p>
<h2 id="broadcasting-settings">Broadcasting Settings</h2>
<p>The following are some suggested settings for a high quality stream you can set in your broadcasting software. But you should keep in mind the highest quality you&rsquo;ll be offering your viewers, as stated above. Continue to read more about the values.</p>
<h3 id="video-resolution-and-quality">Video resolution and quality</h3>
<table>
<thead>
<tr>
<th>Resolution</th>
<th>Framerate</th>
<th>Bitrate</th>
</tr>
</thead>
<tbody>
<tr>
<td>1920x1080</td>
<td>60fps</td>
<td>5000k</td>
</tr>
<tr>
<td>1920x1080</td>
<td>30fps</td>
<td>4500k</td>
</tr>
<tr>
<td>1280x720</td>
<td>60fps</td>
<td>4000k</td>
</tr>
<tr>
<td>1280x720</td>
<td>30fps</td>
<td>3000k</td>
</tr>
</tbody>
</table>
<h3 id="resolution-and-frame-rate">Resolution and Frame rate</h3>
<p>Resolution refers to the size of a video on a screen, and frame rate refers to how many frames per second are displayed. Full HD resolution is typically 1080p, 60 frames per second (fps). Streaming at a higher resolution like 1080p requires a higher bitrate, and a higher frame rate takes more encoding power. If you have the bandwidth and encoding power both on your broadcasting computer and your Owncast server to stream at 1080p, 60 fps, great! If not, try one of the other settings above to optimize your video quality and stability.</p>
<h3 id="bitrate">Bitrate</h3>
<p>The bitrate is the amount of data you send to your Owncast server when you stream. A higher bitrate takes up more of your available internet bandwidth. Increasing your bitrate can improve your video quality, but only up to a certain point.</p>
<h3 id="keyframe-interval">Keyframe Interval</h3>
<p>It is suggested you set your broadcasting software keyframe setting at <em>2</em> and <strong>not</strong> at <code>auto</code>.</p>
<h3 id="audio-settings">Audio settings</h3>
<p>Set your broadcasting software to send Owncast <code>AAC</code> audio.</p>
<h3 id="audio-bitrate-and-quality">Audio bitrate and quality</h3>
<p>When streaming also make sure to match your audio quality to what you&rsquo;re streaming. If you&rsquo;re a music focused stream then maybe go higher. If you&rsquo;re just talking, then maybe you can afford to go lower.</p>
<p>Owncast will not re-encode audio, so it will go out exactly how it&rsquo;s sent.</p>
<table>
<thead>
<tr>
<th>Quality</th>
<th>Bitrate</th>
</tr>
</thead>
<tbody>
<tr>
<td>Low</td>
<td>96kbps</td>
</tr>
<tr>
<td>Medium</td>
<td>128kpbs</td>
</tr>
<tr>
<td>High</td>
<td>192kbps</td>
</tr>
<tr>
<td>Higher</td>
<td>256kbps</td>
</tr>
<tr>
<td>Highest</td>
<td>320kbps</td>
</tr>
</tbody>
</table>
<h2 id="dropping-frames">Dropping frames</h2>
<p>Read more about troubleshooting <a href="/troubleshoot/dropped-frames">Dropped frames</a> being reported in your broadcasting software.</p>
<h2 id="errors-or-disconnections">Errors or disconnections</h2>


<p>Make sure your broadcasting computer is broadcasting live video reliably. If your own computer or network connection is having a hard time getting video to the internet then viewers will be stuck in a buffering state. Reduce the bitrate, resolution and/or framerate in your broadcasting software on broadcasting device if needed.</p>
<p>Take note of any dropped frames and investigate what’s causing those drops. Is it your local CPU or GPU? Is it your local network? Or is it the Owncast server dropping them due to hardware usage?</p>
<p>If, for example, your <a href="https://github.com/obsproject/obs-studio/wiki/GPU-overload-issues">GPU on your broadcasting computer is maxed out</a> then it can&rsquo;t keep up rendering frames. If you&rsquo;re using OBS, one way to determine this is look at the &ldquo;Stats&rdquo; in the application and see if you&rsquo;re experiencing any &ldquo;Rendering Lag&rdquo;.</p>

`},{id:10,href:"/docs/broadcasting/hardware/",title:"Compatible hardware",description:"Various pieces of hardware have been tested with Owncast.",content:`<p>The following hardware with native live streaming have been tested and work.</p>
<ul>
<li><a href="https://gopro.com/">GoPro Hero 8</a></li>
<li><a href="https://mevo.com/">Mevo</a></li>
<li><a href="https://www.blackmagicdesign.com/products/atemmini">ATEM Mini Pro</a></li>
<li><a href="https://www.vizrt.com/tricaster/mini/">TriCaster Mini</a> *you have to send the Stream Key as an unencrypted parameter called &ldquo;Stream ID&rdquo;</li>
<li><a href="https://www.kiloview.com/en/encoder/h264-wired/">Kiloview E1</a></li>
<li><a href="https://www.blackmagicdesign.com/products/blackmagicwebpresenter">Blackmagic Web Presenter HD</a></li>
</ul>
<p>If you have tested other hardware with Owncast we&rsquo;d love to hear about it!</p>
`},{id:11,href:"/docs/configuration/",title:"Configuration",description:"Configuration is done through the Owncast administration page. Learn what you have control over and what customizations can be made.",content:`<p>Configuration is done through the Owncast administration page located on your server under <code>/admin</code>. The login username is <code>admin</code> and the password is your stream key, the default being <code>abc123</code>.</p>
<p><strong>It&rsquo;s highly encouraged to change both your stream key and your admin passwords immediately after installation by visiting <code>/admin/config/server/</code></strong></p>
<p>Some common items many people would want to update after installing Owncast are:</p>
<ul>
<li>Your site name, logo, description and external links that are displayed on the <a href="/docs/website">web site</a>.</li>
<li>The <strong>stream key</strong> to gain access to broadcasting to your stream and your admin.</li>
<li>Enable your stream to show up in the <a href="/docs/directory">Owncast Directory</a>.</li>
</ul>
<h2 id="web-site-details">Web site details</h2>
<p>Your site name, logo, description, and page content can be set in the admin. You can also add links to your social profiles and web sites that exist elsewhere. <a href="/docs/website">See details about the web site and chat interface</a>.
<span class="version-support">
  Changing page settings in the admin panel was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.6">Owncast 0.0.6</a>.
</span>
</p>
<figure><img src="/docs/img/admin-general-settings.png"
         alt="Owncast general settings" width="80%"/><figcaption>
            <p>Owncast general settings</p>
        </figcaption>
</figure>

<h2 id="video-output">Video output</h2>
<p>Depending on your hardware you may be able to configure your server to support multiple output variants for multiple different viewing conditions. <a href="/docs/encoding">Learn how to configure your video and see how it directly effects your CPU usage</a>.</p>
<figure><img src="/docs/img/admin-config-video-variant.png"
         alt="Owncast video settings" width="80%"/><figcaption>
            <p>Owncast video settings</p>
        </figcaption>
</figure>

<span class="version-support">
  Changing video settings in the admin panel was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.6">Owncast 0.0.6</a>.
</span>

<h2 id="custom-ports">Custom Ports</h2>
<p>Per default, Owncast will run a <code>http</code> web server on port <code>8080</code> and a RTMP server on port <code>1935</code>. You can change the ports in the the admin. You must restart Owncast for these changes to take effect.</p>
<p>You can also set the port for the web server on the command line via the <code>-webserverport</code> flag.</p>
<p><figure><img src="/docs/img/admin-server-settings.png"
         alt="Owncast server settings" width="80%"/><figcaption>
            <p>Owncast server settings</p>
        </figcaption>
</figure>

<span class="version-support">
  Custom ports was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.4">Owncast 0.0.4</a>.
</span>

<span class="version-support">
  Port settings in the admin panel was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.6">Owncast 0.0.6</a>.
</span>
</p>
<h2 id="external-storage-providers">External storage providers</h2>
<p>Instead of serving video directly from your personal server you can use a S3 compatible storage provider to offload the bandwidth and storage requirements elsewhere. <a href="/docs/storage">See how to configure the storage provider of your choice</a>.</p>
`},{id:12,href:"/docs/sslproxies/",title:"SSL & HTTP Proxies",description:"Put your Owncast server behind a proxy to enable SSL.",content:`<p>While not required, most people will want to support SSL on a public Owncast server. If you already have a <a href="https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/">reverse proxy</a> that is used for SSL you can easily add Owncast to that. If you&rsquo;ve never installed a proxy service before then you can quickly set one up.</p>
<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">People often overlook the need to proxy their websockets, so if you're having issues with chat make sure you configured your proxy to pass those through.</div>
</div>
<h2 id="why-you-want-to-support-ssl">Why you want to support SSL</h2>
<ol>
<li>If you want to embed your Owncast video or chat into a page that is using SSL your Owncast server will also need to be secured.</li>
<li>Browsers will label your site as <a href="https://support.apple.com/en-us/HT208672">&ldquo;Not Secure&rdquo;</a> without using SSL.</li>
<li>It looks more professional and your site will come off more trustworthy.</li>
<li>Securing web traffic on the public internet is the right thing to do.</li>
</ol>
<h2 id="when-you-might-not-need-it">When you might not need it</h2>
<ol>
<li>If you&rsquo;re just testing and experimenting with Owncast.</li>
<li>You&rsquo;re running the service internally and you don&rsquo;t have any plans for a public audience.</li>
</ol>
<h2 id="popular-options">Popular options</h2>
<p>You can use any method you like to add SSL support but there are some popular options we&rsquo;ve seen work well with people. If you have any specific questions or would like to make suggestions on configurations or other setups <a href="/contact">let us know</a>.</p>
<h2 id="inherit-display-name-from-reverse-proxy">Inherit display name from reverse proxy</h2>
<p>Owncast usually assigns a random display name when new users are joining the chat. Upstream reverse proxies can influence this behavior by setting a <code>X-Forwarded-User</code> HTTP header. This header will be used instead of a random name to derive a user&rsquo;s display name. A user will still be able to change it&rsquo;s own display name to any desired value.</p>
<span class="version-support">
  Inherit display name from reverse proxy was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.11">Owncast 0.0.11</a>.
</span>

<h2 id="suggested">Suggested</h2>
<p>If you have no requirement to use other options else it is suggested you install <a href="caddy/">Caddy</a> as it can be installed quickly and easily.</p>
`},{id:13,href:"/docs/chat/chat-authentication/",title:"Chat authentication",description:"Verify your and keep your chat identity.",content:`<p>There is no requirement to authenticate when using Owncast chat. However, some prefer
to authenticate themselves to verify their identity to others, and to continue using the same chat
identity across multiple devices and browsers. This is especially helpful for those with <a href="/docs/moderation/">moderator</a>
privileges.</p>
<p>You can access the authentication options via the chat dropdown menu in the upper right of the page.</p>
<h2 id="indieauth">IndieAuth</h2>
<p>IndieAuth is an open standard decentralized authentication protocol that enables services to verify the identity of a user represented by a URL. This means anybody that has an existing URL that supports IndieAuth can use it to authenticate with Owncast chat.</p>
<p>Visit <a href="https://indieauth.net/">IndieAuth.net</a> to learn more.</p>
<h3 id="owncast-is-an-indieauth-server">Owncast is an IndieAuth server</h3>
<p>If you run an Owncast server you can use it to authenticate yourself on other Owncast instances by using the URL of your server.</p>
<h2 id="fediverse-authentication">Fediverse Authentication</h2>
<p>Using your Fediverse account you can be sent a one time use code to verify your identity and authenticate
yourself with Owncast chat. Fediverse support must be enabled on the Owncast server for this feature to be available.</p>
<p>This is done by sending a direct message to your account. If you do not receive this message make sure you can accept
direct messages.</p>
<p>These codes expire, so you will need to request a new one if necessary.</p>
`},{id:14,href:"/docs/cdns/",title:"Content Delivery Networks (CDNs)",description:"A CDN can help improve the network performance of your Owncast instance by caching and distributing content from servers located closer to users.",content:`<h2 id="what-is-a-cdn">What is a CDN?</h2>
<p>A CDN, or Content Delivery Network, is a service used to geographically distribute your content to end users. It helps to improve performance by reducing the time it takes to load content.</p>
<span class="version-support">
  Cdn support was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.1.0">Owncast 0.1.0</a>.
</span>

<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">While the actual configuration of a CDN is not overly complex, it should be seen as a slightly advanced topic as you'll be making DNS changes and managing a CDN configuration with a provider.</div>
</div>
<p>A CDN works by distributing the content across multiple servers strategically placed in various geographic locations. This distribution ensures that content is delivered from a server that is physically closer to the user, reducing the distance data needs to travel. It also helps to alleviate the load on the origin (your Owncast server) by offloading the delivery of content to the CDN servers.</p>
<p>CDNs employ caching to store content. When a user requests content that is already cached in the CDN server, it can be delivered quickly without needing to retrieve it from the origin server. This caching mechanism improves the overall speed and responsiveness of your content.</p>
<p>In addition to caching, CDNs may also provide other optimization features such as data compression and security measures like DDoS protection. These additional features contribute to further improving the performance, scalability, and availability of websites and web applications.</p>
<h2 id="how-is-this-helpful-with-your-owncast-stream">How is this helpful with your Owncast stream?</h2>
<p>By putting a CDN in front of your Owncast instance it can be useful for viewers of your stream who may be geographically distant from your actual server, making it slower to stream your video, potentially causing buffering or other issues.</p>
<p>Additionally, your entire Owncast web page will load faster for all visitors, as the CDN will cache and serve the static assets (like CSS, JavaScript, images, etc) that make up your Owncast instance.</p>
<h2 id="what-is-the-difference-between-a-storage-provider-and-a-cdn">What is the difference between a storage provider and a CDN?</h2>
<p>CDNs are designed to improve delivery performance and reduce latency by caching and distributing content from servers located closer to users. Storage providers focus on providing scalable and reliable storage infrastructure for storing data. While there may be some overlap in functionalities, their primary objectives and features differentiate them from each other.</p>
<p>While CDNs and storage providers are two different services, some object storage providers may offer built in CDNs that can be enabled.</p>
<h2 id="how-can-you-use-a-cdn-with-owncast">How can you use a CDN with Owncast?</h2>
<p>While it&rsquo;s impossible to go into detail for every CDN provider and configuration, here are the high level steps you&rsquo;ll need to take to put a CDN in front of your Owncast instance.</p>
<h3 id="without-a-storage-provider">Without a storage provider</h3>
<ol>
<li>Your actual Owncast server, known to a CDN as the &ldquo;origin&rdquo;, will need a publicly available hostname that is different than the one you use to access your Owncast instance. For example, if you want your viewers to access your Owncast instance at <code>https://owncast.example.com</code> you&rsquo;ll need to create a new hostname like <code>owncast-origin.example.com</code> and point it to your Owncast server.</li>
<li>In your CDN configuration you&rsquo;ll need to tell it to use <code>owncast-origin.example.com</code> as the origin for your Owncast instance.</li>
<li>You&rsquo;ll need to update your DNS configuration to point your Owncast hostname to your CDN. For example, if you access your Owncast instance at <code>https://owncast.example.com</code> you&rsquo;ll need to update your DNS configuration to point <code>owncast.example.com</code> to your CDN instead of your actual server.</li>
<li>Visit your Owncast admin and under &ldquo;Server Settings&rdquo; under &ldquo;Advanced&rdquo; you&rsquo;ll set the websocket override to point to the origin hostname you created in step 1. For example, <code>wss://owncast-origin.example.com</code>. If you don&rsquo;t perform this step your chat will no longer be accessible for CDN providers who do not support passing through websockets.</li>
</ol>
<h3 id="with-an-external-storage-provider">With an external storage provider</h3>
<ol>
<li>In this configuration your storage provider is the origin server, not your Owncast server.</li>
<li>Get the endpoint hostname for your storage bucket from your provider.</li>
<li>In your CDN configuration you&rsquo;ll need to tell it to use the storage provider hostname as the origin server.</li>
<li>In the Owncast admin under &ldquo;Storage&rdquo; and &ldquo;Advanced&rdquo; you&rsquo;ll set the &ldquo;Serving endpoint&rdquo; to be the hostname of your CDN deployment.</li>
</ol>
<h2 id="things-to-consider">Things to consider</h2>
<ul>
<li>Your Owncast server (the origin server) must still be on a network fast enough for the CDN to access your content and distribute it to your viewers. Simply adding a CDN won&rsquo;t automatically make your Owncast&rsquo;s network faster, though it may reduce the network load of your server via caching.</li>
<li>In some cases using a CDN in front of your Owncast server makes it more difficult for Owncast to have an accurate count of how many viewers you have. This is a tradeoff you&rsquo;ll need to consider. Generally if you have a low number of viewers it will report a higher number of viewers than you actually have (due to multiple CDN servers fetching your content), and if you have a large number of users it will report a lower number of viewers than you actually have (due to multiple viewers watching the same cached content). Updates to Owncast to help improve this are planned.</li>
<li>The more viewers you have, the more useful a CDN will be. If you have a small number of viewers it&rsquo;s likely every request will be hitting your origin server anyway, so a CDN won&rsquo;t be as useful, and even potentially detrimental to viewers in some cases since it requires an additional network hop. Refer to your CDN statistics to see how many requests are being served from the CDN cache (hits) vs your origin server (misses).</li>
</ul>
`},{id:15,href:"/docs/embed/",title:"Embedding into your site",description:"You can easily embed your chat or video into another site.",content:`<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">Embedding Owncast into an existing page which is using HTTPS will require your Owncast server to also be secured with SSL/TLS.</div>
</div>
<h2 id="embedding-video">Embedding video</h2>
<p>Owncast supports embedding your video stream directly into any other web site or source without having to setup a player.</p>
<p>The video-only URL to your stream content lives at: <code>http://your.host/embed/video</code>.</p>
<p>Here&rsquo;s some example HTML you can use.</p>
<p><div class="highlight"><pre tabindex="0" class="chroma"><code class="language-html" data-lang="html"><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">iframe</span>
</span></span><span class="line"><span class="cl">  <span class="na">src</span><span class="o">=</span><span class="s">&#34;https://your.host/embed/video&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="na">title</span><span class="o">=</span><span class="s">&#34;Owncast&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="na">height</span><span class="o">=</span><span class="s">&#34;350px&#34;</span> <span class="na">width</span><span class="o">=</span><span class="s">&#34;550px&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="na">referrerpolicy</span><span class="o">=</span><span class="s">&#34;origin&#34;</span>
</span></span><span class="line"><span class="cl">  <span class="na">allowfullscreen</span><span class="p">&gt;</span>
</span></span><span class="line"><span class="cl"><span class="p">&lt;/</span><span class="nt">iframe</span><span class="p">&gt;</span></span></span></code></pre></div>
<span class="version-support">
  Embedding video was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.2">Owncast 0.0.2</a>.
</span>
</p>
<p>It will look something like:</p>
<iframe src="https://watch.owncast.online/embed/video" title="Owncast"
height="350px" width="550px"
referrerpolicy="origin" scrolling="no"
allowfullscreen>
</iframe>
<p>Embedded videos will not start playing before the user presses the play button. This means that no sound will appear when a page with an embedded video is loaded. If you would like the player to additionally be muted once it does start playing, you can append <code>?initiallyMuted=true</code> to the URL (so it looks something like <code>http://your.host/embed/video?initiallyMuted=true</code>). Users will still be able to unmute the video manually once it&rsquo;s playing.</p>
<h2 id="customizing-the-embedded-stream-styling">Customizing the Embedded Stream Styling</h2>
<p>You can easily customize the styling of the embedded Owncast stream to match your website&rsquo;s design by applying CSS styles. Here&rsquo;s how you can do it:</p>
<ol>
<li>
<p><strong>Create a CSS File:</strong> First, create a CSS file (e.g., <code>stream-styles.css</code>) where you&rsquo;ll define your custom styles.</p>
</li>
<li>
<p><strong>Link the CSS File:</strong> In the <code>&lt;head&gt;</code> section of your HTML document where you embed the Owncast stream, add a <code>&lt;link&gt;</code> tag to include your CSS file. Make sure to add this line before the closing <code>&lt;/head&gt;</code> tag:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-html" data-lang="html"><span class="line"><span class="cl"><span class="p">&lt;</span><span class="nt">link</span> <span class="na">rel</span><span class="o">=</span><span class="s">&#34;stylesheet&#34;</span> <span class="na">href</span><span class="o">=</span><span class="s">&#34;path/to/stream-styles.css&#34;</span><span class="p">&gt;</span>
</span></span></code></pre></div><p>Replace &ldquo;path/to/stream-styles.css&rdquo; with the actual path to your CSS file.</p>
</li>
<li>
<p><strong>Apply Styles:</strong> Customize the styles in your stream-styles.css file according to your preferences. You can target the <code>&lt;iframe&gt;</code> element using CSS selectors, as shown in the example below:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-css" data-lang="css"><span class="line"><span class="cl"> <span class="c">/* Customize the embedded stream container */</span>
</span></span><span class="line"><span class="cl"> <span class="nt">iframe</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">   <span class="k">border</span><span class="p">:</span> <span class="kc">none</span><span class="p">;</span> <span class="c">/* Remove iframe border */</span>
</span></span><span class="line"><span class="cl">   <span class="k">box-shadow</span><span class="p">:</span> <span class="mi">0</span><span class="kt">px</span> <span class="mi">0</span><span class="kt">px</span> <span class="mi">10</span><span class="kt">px</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mf">0.3</span><span class="p">);</span> <span class="c">/* Add a subtle shadow for depth */</span>
</span></span><span class="line"><span class="cl">   <span class="k">border-radius</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span> <span class="c">/* Rounded corners for a modern look */</span>
</span></span><span class="line"><span class="cl">   <span class="k">overflow</span><span class="p">:</span> <span class="kc">hidden</span><span class="p">;</span> <span class="c">/* Hide horizontal overflow */</span>
</span></span><span class="line"><span class="cl">   <span class="k">background-color</span><span class="p">:</span> <span class="mh">#fff</span><span class="p">;</span> <span class="c">/* Set background color to white */</span>
</span></span><span class="line"><span class="cl">   <span class="k">margin</span><span class="p">:</span> <span class="mi">0</span> <span class="kc">auto</span><span class="p">;</span> <span class="c">/* Center the iframe horizontally */</span>
</span></span><span class="line"><span class="cl"> <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"> <span class="c">/* Style the iframe title (optional) */</span>
</span></span><span class="line"><span class="cl"> <span class="nt">iframe</span><span class="o">[</span><span class="nt">title</span><span class="o">=</span><span class="s2">&#34;Owncast&#34;</span><span class="o">]</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">   <span class="k">font-size</span><span class="p">:</span> <span class="mi">18</span><span class="kt">px</span><span class="p">;</span> <span class="c">/* Adjust the title font size */</span>
</span></span><span class="line"><span class="cl">   <span class="k">font-weight</span><span class="p">:</span> <span class="kc">bold</span><span class="p">;</span> <span class="c">/* Make the title bold */</span>
</span></span><span class="line"><span class="cl">   <span class="k">padding</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span> <span class="c">/* Add some padding around the title */</span>
</span></span><span class="line"><span class="cl"> <span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"> <span class="c">/* Style the iframe content (optional) */</span>
</span></span><span class="line"><span class="cl"> <span class="nt">iframe</span><span class="o">[</span><span class="nt">title</span><span class="o">=</span><span class="s2">&#34;Owncast&#34;</span><span class="o">]</span> <span class="nt">body</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">   <span class="k">margin</span><span class="p">:</span> <span class="mi">0</span><span class="p">;</span> <span class="c">/* Reset margin inside the iframe */</span>
</span></span><span class="line"><span class="cl">   <span class="k">padding</span><span class="p">:</span> <span class="mi">10</span><span class="kt">px</span><span class="p">;</span> <span class="c">/* Add padding inside the iframe content */</span>
</span></span><span class="line"><span class="cl"> <span class="p">}</span>
</span></span></code></pre></div></li>
<li>
<p><strong>Customize to Your Needs:</strong> Feel free to modify the styles provided in the example above to match your website&rsquo;s design and layout.</p>
</li>
</ol>
<p>Following these steps, you can seamlessly integrate your Owncast stream into your website while maintaining control over its visual appearance.</p>
<h3 id="using-the-hls-feed">Using the HLS feed</h3>
<p>As long as the player supports it, it is recommended to open the homepage of your Owncast instance directly.
The player will automatically find the correct playlist and will start playing.
This will guarantee forward compatibility if the way how Owncast publishes HLS is ever changed.</p>
<p>However, if you need the HLS feed (i.e. for sharing your stream to a 3rd party player), you can access the HLS feed directly via this URL: <code>http://your.host/hls/stream.m3u8</code>.</p>
<h3 id="mute-by-default">Mute by default</h3>
<p>If you&rsquo;d prefer your embedded video to be muted by default, you can add <code>?initiallyMuted=true</code> to the end of the <code>/embed/video</code> URL.</p>
<h2 id="embedding-chat">Embedding chat</h2>
<p>Owncast supports embedding your chat directly into any other website or source.</p>
<p>There are two types of embed chats: A read-only chat which only shows the messages and a standalone chat which has the same functionality as the one within the main Owncast web interface.</p>
<h3 id="embedding-standalone-chat">Embedding standalone chat</h3>
<p>The standalone chat URL lives at: <code>http://your.host/embed/chat/readwrite</code>.</p>
<span class="version-support">
  Embedding standalone chat was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.8">Owncast 0.0.8</a>.
</span>

<p>It will look something like:</p>
<iframe src="https://watch.owncast.online/embed/chat/readwrite" title="Owncast"
height="350px" width="550px"
referrerpolicy="origin" scrolling="no"
allowfullscreen>
</iframe>
<h3 id="embedding-read-only-chat">Embedding read-only chat</h3>
<p>The read-only chat URL lives at: <code>http://your.host/embed/chat/readonly</code>.</p>
<p>One common use of read-only chat is adding the chat messages to your broadcasting software, such as a web layer in OBS.</p>
<h4 id="using-obs">Using OBS</h4>
<ol>
<li>
<p>Click the <code>+</code> or right mouse click to add a new source. Choose <code>Browser</code> from the list.</p>
</li>
<li>
<p>For a new source, you will need to add the name. Type in &ldquo;<em>Chat</em>&rdquo;.</p>
</li>
<li>
<p>In the Browser Source settings, you will need to change the URL to your Owncast instance&rsquo;s <code>/embed/chat/readonly</code> url.</p>
</li>
<li>
<p>You can use the <em>Custom CSS</em> to tweak how the browser shows your video. The following example will add some space around the box, give it a semi-transparent dark background; and increase the overall font size to a base unit of 24px. You may change any of these settings to fit your presentation layout. Note that the overall message text color is white.
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-css" data-lang="css"><span class="line"><span class="cl"><span class="nt">html</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="k">margin</span><span class="p">:</span> <span class="mi">0</span><span class="kt">px</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">padding</span><span class="p">:</span> <span class="mi">20</span><span class="kt">px</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="k">background-color</span><span class="p">:</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="k">font-size</span><span class="p">:</span> <span class="mi">24</span><span class="kt">px</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl"><span class="p">#</span><span class="nn">chat-container</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl"><span class="k">background-color</span><span class="p">:</span> <span class="nb">rgba</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mf">0.5</span><span class="p">);</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span></span></span></code></pre></div></p>
</li>
<li>
<p>Click ‘OK’ to save your chat settings and re-position the new chat source in your scene.</p>
</li>
</ol>
<span class="version-support">
  Embedding readonly chat was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.2">Owncast 0.0.2</a>.
</span>

<h2 id="ssl-requirements">SSL Requirements</h2>
<p>Embedded Owncast content that is not served via HTTPS within a page that is using SSL/TLS gets <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content">blocked by browsers</a>. <a href="/docs/sslproxies">Learn how you can use a SSL Proxy</a> to fulfil this browser requirement and secure your Owncast site.</p>
`},{id:16,href:"/docs/custom-assets/",title:"Host public assets",description:"Make your own files publicly available.",content:`<p>By creating a <code>data/public</code> directory and putting your own files there you can serve any assets that you wish to make publicly available for any reason.</p>
<span class="version-support">
  Custom public assets was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.1.0">Owncast 0.1.0</a>.
</span>

<p>Some exmples of reasons you might want to take advantage of this:</p>
<ul>
<li>Making a CSS font available so you can reference it in your custom CSS.</li>
<li>You have images you wish to use in your page content.</li>
<li>Some arbitrary files that you want people to download have no other place to be hosted.</li>
</ul>
`},{id:17,href:"/docs/notifications/",title:"Live stream notifications",description:"Send notifications when your stream goes live.",content:`<p>Some streams benefit from announcing to their audience when they go live.</p>
<p>This is not an endorsement of any particular service, but it may help some streamers integrate into their existing communities.</p>
<p>If you&rsquo;d like to expand on this and send automated notifications to other destinations, create a custom <a href="/thirdparty/webhooks/">webhook</a>.</p>
<span class="version-support">
  External notification was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.12">Owncast 0.0.12</a>.
</span>

<h2 id="browser-notifications">Browser notifications</h2>
<p>Using browser push notifications your viewers can choose to be notified each time you go live.</p>
<p>Not all browser support this feature, and browser that do may handle it differently. Brave Browser, for example, require you to choose the duration the notifications are valid. They will likely want to select &ldquo;Forever&rdquo; to keep the notification active.</p>
<h3 id="enabling-browser-notifications-on-ios">Enabling browser notifications on iOS</h3>
<p>You can request to be notified when a stream goes live on iOS by following these steps:</p>
<ol>
<li>Open Safari and navigate to your Owncast instance.</li>
<li>Tap the share icon at the bottom of your browser.</li>
<li>Tap &ldquo;Add to Home Screen&rdquo;.</li>
<li>Tap the new Owncast icon on your home screen.</li>
<li>Press the &ldquo;Notify&rdquo; button.</li>
<li>Tap &ldquo;Allow&rdquo; when prompted.</li>
</ol>
<h3 id="browser-extension">Browser extension</h3>
<p>Another suggested way to receive browser notifications from any number of streams is by using the
<a href="https://github.com/craftamap/owncast-browser-extension">Owncast Browser Extension by craftamap</a>. It&rsquo;s available for <a href="https://chrome.google.com/webstore/detail/owncast-extension/djgneammmklaajinkihpibdpaflehgio">Chrome</a> and <a href="https://addons.mozilla.org/en-US/firefox/addon/owncast-extension/">Firefox</a>.</p>
<h2 id="fediverse">Fediverse</h2>
<p>The Fediverse social features have built in support to notify your followers when you go live. <a href="/docs/social/">Visit the documentation</a> for more information.</p>
<h2 id="discord">Discord</h2>
<p>You can notify a Discord channel when your stream goes live. Visit the <a href="https://support.discord.com/hc/en-us/articles/228383668">Discord documentation</a> for complete instructions.</p>
<ul>
<li>Visit Edit Channel / Integrations on your Discord channel.</li>
<li>Create a webhook.</li>
<li>Provide URL in the Owncast configuration.</li>
</ul>
<h2 id="twitter-deprecated">Twitter (deprecated)</h2>
<p>Since <a href="https://9to5google.com/2023/01/12/twitter-api-appears-to-be-down-breaking-tweetbot-and-third-party-clients/">access to Twitter&rsquo;s API has been revoked</a>, Twitter notifications are no longer supported. For more details, please refer to <a href="https://github.com/owncast/owncast/issues/2597">this issue on GitHub</a>.</p>
`},{id:18,href:"/docs/resources-requirements/",title:"Resources and requirements",description:"There is no hard and fast rule for how much resources Owncast will use, since it depends on your configuration and requirements, but here are some examples.",content:`<p>It&rsquo;s impossible to give a single answer about what the requirements are for you to run Owncast, or what it will cost. It&rsquo;s your server, and it&rsquo;s completely up to you how you choose to configure it, and in what environments you choose to run it. Every environment has different performance, prices and features.</p>
<h2 id="base-knowledge">Base knowledge</h2>
<p>It&rsquo;s very helpful for you to understand the basics included in video streaming.</p>
<ul>
<li>CPU: Used to transcode the video to multiple qualities so viewers can watch it on different speed networks.</li>
<li>Network bandwidth: Used to distribute the video to your viewers.</li>
</ul>
<h3 id="viewer-count-does-not-impact-cpu-use">Viewer count does not impact CPU use</h3>
<p>Knowing this, you see that <strong>CPU usage is the same regardless of how many viewers you have</strong>. 0 or 100, the CPU is still performing the work. Think of it like creating a zip file. If you have a 100MB file, and you zip it, and it becomes 70MB, you can send that 70MB file to as many people as you want without zipping that file again for each person. But you still need to send the file to each person seperately, requiring network bandwidth for each time you send it. However, if you want to send some people a 70MB version and others a 50MB version, you&rsquo;ll need to create two seperate files. That 50MB version will take longer and use more CPU to create, because of the additional work it takes to compress the file more. This is the same with video. The more work required to encode your video, the more CPU that&rsquo;s required. Generally, the more you need to reduce the size and bitrate of your video, the more CPU that will be used. But offering low bitrate/lower quality versions of your stream is important to enable more viewers to watch it from across the world, on any kind of network.</p>
<p>Now that you understand the basics, let&rsquo;s use an example to illustrate how your configuration can impact your server&rsquo;s resources, and most importantly, your viewers&rsquo; experience. It&rsquo;s a little simplistic and the actual numbers can vary in real life, but it could help answer the question of &ldquo;approximately how much bandwidth and CPU will Owncast use?&rdquo;</p>
<h2 id="example-scenario">Example Scenario</h2>
<p>You&rsquo;ve configured your broadcasting source (such as OBS) to stream to your Owncast instance at <strong>5000kbps</strong>. You have <strong>25 viewers</strong>. <strong>5</strong> of them are on slow or mobile networks, <strong>17</strong> of them have fast, stable internet, and <strong>3</strong> of them have fast internet most of the time but the speed fluctuates. All 25 viewers watched an entire stream that lasts two hours. You have a hosting provider that gives you 4TB of bandwidth per month.</p>
<h3 id="offer-a-high-and-low-quality-option">Offer a high and low quality option</h3>
<p>You decide to offer both a high and low quality option, and you set the high quality option to 5000kbps and the low quality option to 1500kbps.</p>
<p><strong>How much bandwidth is used on your server for this stream?</strong></p>
<table>
<thead>
<tr>
<th>Bitrate</th>
<th>Duration</th>
<th>Viewers</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>0.000625 Gigabytes per second (5000kbps)</td>
<td>7200 seconds</td>
<td>19</td>
<td>85 Gigabytes</td>
</tr>
<tr>
<td>0.0001875 Gigabytes per second (1500kbps)</td>
<td>7200 seconds</td>
<td>6</td>
<td>8.1 Gigabytes</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td><strong>Total</strong>: 93.1 Gigabytes</td>
</tr>
</tbody>
</table>
<p><strong>How much CPU?</strong></p>
<table>
<thead>
<tr>
<th>Quality</th>
<th>CPU Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>5000kbps</td>
<td>Some (It matches the input)</td>
</tr>
<tr>
<td>1500kbps</td>
<td>More (CPU needs to be used to compress the video)</td>
</tr>
</tbody>
</table>
<p><strong>How is the viewer experience?</strong></p>
<table>
<thead>
<tr>
<th>Quality</th>
<th>Viewers</th>
<th>Experience</th>
</tr>
</thead>
<tbody>
<tr>
<td>5000kbps</td>
<td>20</td>
<td>Good</td>
</tr>
<tr>
<td>1500kbps</td>
<td>5</td>
<td>Good</td>
</tr>
</tbody>
</table>
<p><strong>Result</strong>: You&rsquo;ve provided both a high and low quality option for your viewers so those with a slow network have an option, and those with a fast network that might periodically slow down can dip down into the low quality when needed. Additionally, in this case you saved almost 20G of bandwidth traffic due to offering a lower quality. You&rsquo;re using more CPU for a much better experience. You would be able to stream 43 times in a month before you hit your bandwidth limit.</p>
<h3 id="offer-a-single-high-quality-option-using-the-least-amount-of-cpu">Offer a single high quality option using the least amount of CPU</h3>
<p>You&rsquo;ve decided you want to use as little CPU on your Owncast server as possible so you enable &ldquo;Video Passthrough&rdquo; mode as the only output available. This means the exact video you&rsquo;re sending from your local broadcasting software is what is sent to your viewers.</p>
<p><strong>How much bandwidth is used on your server for this stream?</strong></p>
<table>
<thead>
<tr>
<th>Bitrate</th>
<th>Duration</th>
<th>Viewers</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>0.000625 Gigabytes per second (5000kbps)</td>
<td>7200 seconds</td>
<td>25</td>
<td>112.5 Gigabytes</td>
</tr>
</tbody>
</table>
<p><strong>How much CPU?</strong></p>
<table>
<thead>
<tr>
<th>Quality</th>
<th>CPU Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>5000kbps</td>
<td>Little</td>
</tr>
</tbody>
</table>
<p><strong>How is the viewer experience?</strong></p>
<table>
<thead>
<tr>
<th>Quality</th>
<th>Viewers</th>
<th>Experience</th>
</tr>
</thead>
<tbody>
<tr>
<td>5000kbps</td>
<td>17</td>
<td>Good</td>
</tr>
<tr>
<td>5000kbps</td>
<td>3</td>
<td>Bad</td>
</tr>
<tr>
<td>5000kbps</td>
<td>5</td>
<td>Unwatchable</td>
</tr>
</tbody>
</table>
<p><strong>Result</strong>: You&rsquo;re not using much CPU, but only <strong>65%</strong> of your viewers are having a good experience. The other <strong>35%</strong> are having a bad experience with frequent buffering, and <strong>20%</strong> of them cannot watch your stream at all. You would be able to stream 35 times in a month before you hit your bandwidth limit.</p>
<h3 id="use-a-s3-compatible-storage-provider-for-bandwidth">Use a S3 compatible storage provider for bandwidth</h3>
<p>If you have concerns about your hosting plan, bandwidth allocation or viewership growth you can use a S3 storage provider instead of your server for bandwidth responsibilities. In this example you again decide to offer both a high and low quality option, and you set the high quality option to 5000kbps and the low quality option to 1500kbps. The CPU used is the same as the above example for the high+low quality option. Learn more about <a href="/docs/storage">S3 compatible storage</a>.</p>
<p><strong>How much bandwidth is used on your server for this stream?</strong></p>
<table>
<thead>
<tr>
<th>Bitrate</th>
<th>Duration</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>0.000625 Gigabytes per second (5000kbps)</td>
<td>7200 seconds</td>
<td>4.5 Gigabytes</td>
</tr>
<tr>
<td>0.0001875 Gigabytes per second (1500kbps)</td>
<td>7200 seconds</td>
<td>1.35 Gigabytes</td>
</tr>
<tr>
<td></td>
<td></td>
<td><strong>Total</strong>: 5.85 Gigabytes</td>
</tr>
</tbody>
</table>
<p><strong>How much outbound bandwidth is used on your S3 provider for this stream?</strong></p>
<table>
<thead>
<tr>
<th>Bitrate</th>
<th>Duration</th>
<th>Viewers</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>0.000625 Gigabytes per second (5000kbps)</td>
<td>7200 seconds</td>
<td>19</td>
<td>85 Gigabytes</td>
</tr>
<tr>
<td>0.0001875 Gigabytes per second (1500kbps)</td>
<td>7200 seconds</td>
<td>6</td>
<td>8.1 Gigabytes</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td><strong>Total</strong>: 93.1 Gigabytes</td>
</tr>
</tbody>
</table>
<p><strong>Result</strong>: You&rsquo;ve provided both a high and low quality option for your viewers so those with a slow network have an option, and those with a fast network that might periodically slow down can dip down into the low quality when needed. However, these video qualities are not being served from your Owncast server, but instead an external S3 compatible storage provider. This allows for increasing your viewership and adding additional video qualities without concern of you exhausting your server&rsquo;s bandwidth allocation. You would be able to stream 24/7 without worry using this configuration, however you&rsquo;d be using the same amount of your server bandwidth if you had zero viewers or 100 viewers. Your CPU usage would be the same as if you were serving the video directly from your server.</p>
<h2 id="summarized-faq">Summarized FAQ</h2>
<h3 id="how-much-bandwidth-will-owncast-use">How much bandwidth will Owncast use?</h3>
<p>It depends on your configuration and how many viewers you have. If you offer more video quality options you will often reduce your network transfer requirements. Look into object storage (S3) to reduce your server&rsquo;s network requirements.</p>
<h3 id="how-much-cpu-will-owncast-use">How much CPU will Owncast use?</h3>
<p>It depends on how many different quality output options you are offering your viewers and what those qualities are.</p>
<h3 id="does-cpu-usage-increase-with-more-viewers">Does CPU usage increase with more viewers?</h3>
<p>Not in a meaningful way. There are limits when you&rsquo;re talking tens of thousands of chat participants, however.</p>
<h3 id="how-much-cpu-is-used-for-each-output-quality">How much CPU is used for each output quality?</h3>
<p>It depends on your configuration, but generally if you said one CPU core for each quality you&rsquo;re offering, that&rsquo;s a good rule of thumb. But it&rsquo;s not a hard rule and can be less.</p>
<h3 id="how-does-frame-rate-affect-cpu-usage">How does frame rate affect CPU usage?</h3>
<p>The fewer frames, the less CPU that is used. If you want to reduce the CPU being used on one of your video qualities you can reduce the frame rate. If you want to reduce the CPU being used for all of Owncast you can reduce the frame rate of your inbound source content in your broadcasting software, such as OBS.</p>
<h3 id="how-much-disk-space-will-owncast-use">How much disk space will Owncast use?</h3>
<p>Almost none, as the live stream is cleaned up in real-time as you stream.</p>
<h3 id="can-i-just-offer-one-quality-the-highest-possible-to-lower-the-cpu-requirements-i-only-want-people-to-see-the-best-quality-video-anyway">Can I just offer one quality, the highest possible, to lower the CPU requirements? I only want people to see the best quality video, anyway.</h3>
<p>It&rsquo;s not about you, your bandwidth, or your CPU. It&rsquo;s about your viewers. Not everyone can watch the highest quality. If they can&rsquo;t watch your stream because you didn&rsquo;t have them in mind then it&rsquo;s not worth streaming in the first place.</p>
<h2 id="learn-more">Learn more</h2>
<p>Visit the detailed <a href="/docs/video">video documentation</a> to learn more about how Owncast handles video.</p>
<style>
    table {
  text-align: left;
  position: relative;
  border-collapse: collapse; 
}

td, th {
  border: 1px solid #999;
  padding: 10px;
}
th {
  background: #827bff;
  border-radius: 0;
  position: sticky;
  top: 0;
  padding: 10px;
}
.primary{
  background-color: #000000
}

</style>
`},{id:19,href:"/docs/systemservice/",title:"Run as a system service",description:"Setup owncast to run as a system service, automatically starting when your server does.",content:`<p>You can optionally setup Owncast to run under <a href="https://systemd.io/">systemd</a> so it&rsquo;s a managed service on your machine that automatically starts when your machine does.</p>
<p>While we can&rsquo;t explicitly support every possible machine&rsquo;s configuration you might be able to find some user-supplied examples in our <a href="https://github.com/owncast/owncast/tree/develop/contrib">contrib directory</a> that might point you in the correct direction.</p>
<p>These files are not part of the Owncast project and are not supported by us, but there is ample documentation about how to configure systemd online if you&rsquo;re unable to find examples that work for you.</p>
<h3 id="installation">Installation</h3>
<p>Create your systemd unit file in your systemd configuration directory (typically /etc/systemd/system/), and update the systemd daemon with:
<code>sudo systemctl daemon-reload</code> when you&rsquo;re done.</p>
`},{id:20,href:"/docs/social/",title:"Social features",description:"Allow people to follow your server, know when you go live, share and interact with your stream.",content:`<p>Owncast allows people to follow, engage with your server, and share your stream with others on what is known as the Fediverse, a decentralized network of services.</p>
<span class="version-support">
  Social functionality was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.11">Owncast 0.0.11</a>.
</span>

<h2 id="what-it-supports">What it supports</h2>
<ol>
<li>People can follow your server.</li>
<li>Your followers show up in the &ldquo;Followers&rdquo; tab on your stream&rsquo;s page.</li>
<li>You can send out posts to your followers via the admin.</li>
<li>Your followers will automatically get notified when you go live.</li>
<li>Your followers can share that you&rsquo;ve gone live with their circle of followers.</li>
<li>Actions such as following, liking or sharing get exposed within your stream&rsquo;s chat.</li>
</ol>
<h2 id="why">Why?</h2>
<p>It&rsquo;s a good way for your audience to get notified when you go live, share it with their circle, and to be highlighted within your page and chat.</p>
<h2 id="how-to-enable">How to enable</h2>
<p>This functionality is disabled by default. To enable social features on your Owncast server visit the <em>Configuration -&gt; Social</em> page.</p>
<h3 id="requirements">Requirements</h3>
<ol>
<li>You must be hosting your Owncast server behind SSL, with a <em>https</em> URL. Setup a <a href="/docs/sslproxies/">HTTP Proxy</a> if needed.</li>
<li>Once you set your server name and your username that&rsquo;s how people will see you. If you change either of those two settings you&rsquo;ll show up as a different user and your existing followers may no longer be following you. It is not suggested you change these after you set them.</li>
</ol>
<h3 id="configuration">Configuration</h3>
<p>Visit the <em>Configuration -&gt; Social</em> page to configure.</p>
<ol>
<li>You can set the username that you&rsquo;re seen as.</li>
<li>You can set the text that is sent out each time you go live.</li>
<li>You can toggle &ldquo;Private mode&rdquo;.</li>
</ol>
<h3 id="private-mode">Private mode</h3>
<p>Enabling <em>Private Mode</em> will require those who wish to follow your server to be approved by you first. Approving followers can be done via the <em>Followers</em> section in the admin.</p>
<p>Private Mode will also make it so any posts you send out are only visible to your followers, not others, as they cannot be shared.</p>
<h2 id="how-do-people-follow-your-owncast-server">How do people follow your Owncast server?</h2>
<p>Any person on the Fediverse using a service that is compatible with following Owncast, such as <a href="https://pleroma.social/">Pleroma</a> or <a href="https://joinmastodon.org/">Mastodon</a> can follow your server.</p>
<p><a href="#learn-more">Learn more about The Fediverse</a>.</p>
<h2 id="how-it-works">How it works</h2>
<p>The Fediverse is an ensemble of decentralized and interconnected servers that are used for social networking, microblogging and more. While each server is independently hosted, they communicate with each other.</p>
<p>Each Owncast instance operates as a completely standalone server with a single user that can take part in the Fediverse, exchanging posts and notifications with any participating user who is interested in them.</p>
<p>Any user on the Fediverse that is on a compatible server can follow any Owncast server that has this feature enabled.</p>
<h2 id="composing-messages-to-your-followers">Composing messages to your followers</h2>
<p>By clicking the <em>Compose</em> button in the admin header you can create a post to send to your followers. This could be used to tell people when you plan on streaming, or to remind people that you&rsquo;re still live.</p>
<h2 id="engagement">Engagement</h2>
<p>If somebody <strong>follows</strong> you, <strong>likes</strong> a post you send out, or <strong>shares</strong> any of your posts while a stream is live it will display that these actions took place within the chat feed. This can be disabled under the social settings.</p>
<center>
    <figure>
  <img src="/docs/img/fediverse.svg" width="30%" id="learn-more" />
  <figcaption>
      <h4>The Fediverse</h4>
  </figcaption>
</figure>
</center>
<h2 id="where-to-learn-more-about-the-fediverse">Where to learn more about The Fediverse</h2>
<p>A decentralized network of different services built on standards is the future of social networking. Learn more about all the different services that make up The Fediverse and see how, much like Owncast can empower you to operate your own live streams, there are other opportunities to leave the centralized corporate social networking services in the past.</p>
<h3 id="discover-services-and-sites-that-make-up-the-fediverse">Discover services and sites that make up The Fediverse</h3>
<ul>
<li><a href="https://joinfediverse.wiki/What_is_the_Fediverse%3F">What is The Fediverse?</a> on Fediverse.wiki.</li>
<li><a href="https://en.wikipedia.org/wiki/Fediverse">Fediverse</a> on Wikipedia.</li>
<li><a href="https://fediverse.party/">Fediverse.party</a></li>
<li><a href="https://fediverse.observer/">Fediverse.observer</a></li>
<li><a href="https://www.fediverse.to/">Fediverse.to</a></li>
</ul>
<h3 id="communities-discussing-the-fediverse">Communities discussing The Fediverse</h3>
<ul>
<li><a href="https://socialhub.activitypub.rocks/">SocialHub</a></li>
</ul>
`},{id:21,href:"/docs/stream-keys/",title:"Stream Keys",description:"Add multiple stream keys for your streamers",content:`<p>Beginning with Owncast v0.1.0 the admin password and stream keys are managed independently, allowing you to add as many stream keys as you&rsquo;d like.</p>
<span class="version-support">
  Multiple stream keys was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.1.0">Owncast 0.1.0</a>.
</span>

<p>While most people won&rsquo;t require having multiple stream keys, there are some specific scenarios where having this ability may be helpful.</p>
<p>In the admin server setup page you can add and remove these keys.</p>
`},{id:22,href:"/docs/metrics/",title:"Stream performance",description:"It's important to know if your Owncast stream is performing well. There are a few tools within the admin to assist with this.",content:`<h2 id="overall-stream-health">Overall stream health</h2>


<p>There’s no point streaming if nobody is able to watch it. Using the “Stream Health” screen in the admin you can get an overview of some important metrics that may give you an idea if what you’re offering your viewers is leading to a good experience.</p>
<p>Seeing errors, low network speeds, and excessive download times for your content may mean you need to add additional video qualities to improve the playback performance for lower bandwidth viewers, mobile networks, or other factors.</p>
<p>If you&rsquo;re seeing on this page that people are experiencing issues playing back your stream, you may wish to <a href="/troubleshoot">troubleshoot</a>.</p>
<p>Note: Not all players will be represented in playback metrics as Owncast can only get detailed playback details in certain browsers, and not at all from external players (QuickTime, VLC, mpv, smart tvs, etc).</p>

<h2 id="hardware">Hardware</h2>
<p>Knowing how your CPU, in particular, is keeping up with the video processing tasks is important when troubleshooting. Owncast gives you a high level overview of key hardware metrics to help with this.</p>
<p>If you see your hardware is being over utilized, you may wish to <a href="/troubleshoot">troubleshoot</a>.</p>
<h2 id="prometheus">Prometheus</h2>
<p>For people who prefer to use external monitoring solutions, Owncast supports using <a href="https://prometheus.io/">Prometheus</a> to collect a set of metrics.</p>
<p>You can point your Prometheus config at your Owncast instance with the endpoint of <code>/api/admin/prometheus</code>, using basic auth and the admin login data.</p>
<p>For example:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-yaml" data-lang="yaml"><span class="line"><span class="cl">- <span class="nt">job_name</span><span class="p">:</span><span class="w"> </span><span class="l">owncast</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">scrape_interval</span><span class="p">:</span><span class="w"> </span><span class="l">1m</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">metrics_path</span><span class="p">:</span><span class="w"> </span><span class="l">/api/admin/prometheus</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">scheme</span><span class="p">:</span><span class="w"> </span><span class="l">https</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">basic_auth</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">username</span><span class="p">:</span><span class="w"> </span><span class="l">admin</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span><span class="nt">password</span><span class="p">:</span><span class="w"> </span><span class="l">my_admin_password</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">  </span><span class="nt">static_configs</span><span class="p">:</span><span class="w">
</span></span></span><span class="line"><span class="cl"><span class="w">    </span>- <span class="nt">targets</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="s2">&#34;my.owncast.server&#34;</span><span class="p">]</span><span class="w">
</span></span></span></code></pre></div>`},{id:23,href:"/docs/chat/moderation/",title:"Chat moderation",description:"Add moderators, remove messages and users from your chat.",content:`<p>Using either the Owncast admin, or inline moderation controls within your chat, you can remove individual messages or entire users.</p>
<h2 id="chat-moderators">Chat Moderators</h2>
<p>Moderators have no access to the admin, and exist to help you keep your chat in order.</p>
<p>In your admin Visit <code>Chat &amp; Users</code> &gt; <code>Users</code> to find the user you want to grant Moderator privileges.
Bring up their details and you can add them as a moderator.</p>
<p>By default there are no moderators, so at the very least you might want to make yourself one.</p>
<p>Moderators will be notified when they become one, and have a moderator icon next to their name in chat
that everyone can see.</p>
<span class="version-support">
  Moderation was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.11">Owncast 0.0.11</a>.
</span>

<h2 id="how-to-moderate">How to moderate</h2>
<p>Once you become a moderator you can hover over a chat message and open a menu where you can remove a single message,
or ban the user from the chat completely.</p>
<p>Using the &ldquo;More info&rdquo; action you can get a short overview of the user such as when they first joined. This information
is useful when trolls are trying to impersonate somebody.</p>
<img src="/images/moderator-menu.png"/>
<h2 id="removing-chat-messages-using-the-admin">Removing chat messages using the Admin</h2>
<p>Visit <code>Chat &amp; Users</code> &gt; <code>Messages</code> in your admin to perform chat message moderation tasks.</p>
<span class="version-support">
  Chat message moderation was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.5">Owncast 0.0.5</a>.
</span>

<h3 id="single-message">Single message</h3>
<p>You can toggle the visibility of a single message in your chat by clicking the visibility toggle button (that looks like an eyeball) on the far right of each message.</p>


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/chat-moderation-hide-message.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div>
<h3 id="bulk-changing-of-visibility">Bulk changing of visibility</h3>


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/chat-moderation-bulk-hide-messages.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div>
<p>Alternately, you can select, via checkboxes, the messages you want to change all at once, and then press the <em>&ldquo;show&rdquo;</em> or <em>&ldquo;hide&rdquo;</em> buttons.</p>
<h2 id="banning-users-from-your-chat-using-the-admin">Banning users from your chat using the Admin</h2>
<p>Visit <code>Chat &amp; Users</code> &gt; <code>Users</code> in your admin to perform user moderation tasks.</p>
<p>Banning a user will immediately disconnect them from chat and hide the chat interface from their browser. It will also remove all previous messages sent by this user from the chat feed.</p>
<p>You can un-ban a previously banned user, but note that it will not restore these removed messages. You may restore them manually if needed.</p>
<span class="version-support">
  Chat user moderation was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.8">Owncast 0.0.8</a>.
</span>



<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/user-moderation-ban-user.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div>
<p>Alternatively, you can click on the user display name and bring up the user info modal and ban them from there.</p>


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/user-moderation-ban-user-modal.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div>
<h2 id="ip-address-blocking">IP Address Blocking</h2>
<p>When banning a user Owncast will automatically block their known IP address. While this can deter most trolls,
like anything else, it is possible to evade.</p>
<ul>
<li>Owncast uses the IP address as provided in the <code>x-forwarded-for</code> header if it&rsquo;s provided, meaning it may be possible
for somebody to override this value with a fake address. If you&rsquo;re concerned about this, make sure your reverse proxy
is configured to explicitly set the correct header value.</li>
<li>VPNs are a thing. By using a VPN it&rsquo;s trivial to evade the IP address ban.</li>
</ul>
<p>This is all to say: This feature will help keep abuse down, but in no way does it guarantee that it will keep the
worst of the worst away. Moderation is still the responsibility of each individual stream.</p>
<p>A list of blocked IPs can be viewed in the Admin Chat Users interface and can be un-banned via the same interface.</p>
<span class="version-support">
  IP address bans was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.12">Owncast 0.0.12</a>.
</span>

`},{id:24,href:"/docs/chat/emoji/",title:"Custom emoji",description:"Add your own custom emoji for use in chat.",content:`<p>Your stream&rsquo;s chat can be customized with your own custom emoji. You can add as many as you&rsquo;d like and they&rsquo;ll be available to use in chat.</p>
<h2 id="in-the-admin">In the Admin</h2>
<p>By visiting the chat custom emoji page in the admin located at <code>/admin/chat/emojis</code> you can add and remove images that are available to chat participants.</p>
<span class="version-support">
  Emoji management was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.1.0">Owncast 0.1.0</a>.
</span>

<h2 id="manual-management">Manual management</h2>
<p>You can manually add or remove custom emoji images in the <code>data/emoji</code> directory on your filesystem.</p>
<h2 id="bundled-emoji-images">Bundled emoji images</h2>
<p>The images bundled with Owncast out of the box are freely licensed by different authors. See the <a href="https://github.com/owncast/owncast/tree/develop/static/img/emoji">directory of emoji</a> for the respective licenses associated to each collection.</p>
`},{id:25,href:"/docs/website/",title:"Web Site + Chat",description:"Customize your Owncast web page by adding additional content and links.",content:`<h2 id="overview">Overview</h2>
<p>Owncast includes a web interface for your video with built-in chat that is available once you start the server. It shows online/offline states, viewer counts, stream duration, your instance&rsquo;s description, images, links and more. You can just start using it without making any changes, but you&rsquo;ll likely want to update the content displayed on your page by visiting your server admin page.</p>
<p>Additionally, the web interface was specifically built to be customizable by anybody comfortable tweaking colors and styles. No development environment is needed, just open the admin and start tweaking.</p>
<p>If you want to embed Owncast in your existing website, checkout our <a href="/docs/embed/">documentation on embedding Owncast</a>.</p>
<p>Below are some items you&rsquo;ll likely want to customize to update the content that displays on your page.</p>
<span class="version-support">
  Changing settings in the admin panel was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.6">Owncast 0.0.6</a>.
</span>

<h3 id="name-and-description">Name and description</h3>
<p>By setting your name, description and logo you can quickly update the contents of the website to reflect your stream.</p>
<figure><img src="/docs/img/admin-general-settings.png"
         alt="Owncast general settings" width="100%"/><figcaption>
            <p>Owncast general settings</p>
        </figcaption>
</figure>

<h3 id="tags">Tags</h3>
<p>By setting tags you&rsquo;re showing potential viewers what categories of content you typically stream.</p>
<figure><img src="/docs/img/admin-settings-tags-social.png"
         alt="Add tags" width="100%"/><figcaption>
            <p>Add tags</p>
        </figcaption>
</figure>

<h3 id="external-social-links">External social links</h3>
<p>You can add links to your profiles on other sites by adding them in the admin.
<figure><img src="/docs/img/admin-settings-social-handle.png"
         alt="Add social links" width="100%"/><figcaption>
            <p>Add social links</p>
        </figcaption>
</figure>
</p>
<h3 id="web-page-content">Web page content</h3>
<p>The body of your page content can be customized in your admin. Use standard <a href="https://www.markdownguide.org/basic-syntax/">Markdown syntax</a> to add links, images, and more.</p>
<h2 id="chat">Chat</h2>
<h3 id="text-formatting">Text Formatting</h3>
<p>The web chat supports some basic formatting using <a href="https://www.markdownguide.org/basic-syntax/">Markdown</a>:</p>
<p>Italic: <code>*your text*</code></p>
<p>Bold: <code>**your text**</code></p>
<p>Strikethrough: <code>~~your text~~</code></p>
<p>Code blocks: <code>\`your text\`</code></p>
<h3 id="custom-emoji">Custom Emoji</h3>
<p>Place your own custom emoji images into <code>/webroot/img/emoji/</code> and the next time you refresh the web site you&rsquo;ll see your images in the emoji picker, available for use in chat.</p>
<span class="version-support">
  Emoji was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.2">Owncast 0.0.2</a>.
</span>

<h2 id="player">Player</h2>
<p>The web video player has a handful of keyboard shortcuts you can use.</p>
<table>
<thead>
<tr>
<th>Action</th>
<th>Shortcut</th>
</tr>
</thead>
<tbody>
<tr>
<td>Play/Pause</td>
<td><em>Spacebar</em></td>
</tr>
<tr>
<td>Volume up</td>
<td><em>0</em></td>
</tr>
<tr>
<td>Volume down</td>
<td><em>9</em></td>
</tr>
<tr>
<td>Mute</td>
<td><em>m</em></td>
</tr>
<tr>
<td>Toggle full screen</td>
<td><em>f</em></td>
</tr>
<tr>
<td>Toggle chat</td>
<td><em>c</em></td>
</tr>
</tbody>
</table>
<span class="version-support">
  Player shortcuts was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.7">Owncast 0.0.7</a>.
</span>

<h2 id="custom-styles-via-css">Custom Styles via CSS</h2>
<p>Under the General Settings in the admin you can write your own CSS that will get applied to the web page. There is no validation or sanity checks, so anything you write will get inserted into a <code>&lt;style&gt;</code> tag on your page. So if you make a CSS mistake, you may mess something up on your page.</p>
<h3 id="some-examples-of-things-you-can-try">Some examples of things you can try.</h3>
<ol>
<li>Customize your font.</li>
<li>Change text sizes and colors.</li>
<li>Set a new background color.</li>
<li>Completely hide specific things you don&rsquo;t want or care about.</li>
</ol>
<span class="version-support">
  Custom styles was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.7">Owncast 0.0.7</a>.
</span>

`},{id:26,href:"/docs/codecs/",title:"Codecs & Hardware Acceleration",description:"If you have direct access to specific hardware you may be able to increase the performance of your server by using a compatible codec.",content:`<span class="version-support">
  Hardware accelerated encoding was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.7">Owncast 0.0.7</a>.
</span>

<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">This should be viewed as an advanced topic that may require a substantial investment in time to get working. It may require downloading and compiling source code. It is highly recommended you configure and use your Owncast server without using alternate codecs first. Get Owncast working and improve performance later.</div>
</div>
<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">It is unlikely that any specific support can be provided to help you, as it very much depends on the hardware you have and the software, drivers and versions of libraries you have installed. Outside of this document you are mostly on your own.</div>
</div>
<h1 id="requirements">Requirements</h1>
<p><strong>All four of these things need to be true to support hardware accelerated encoding with Owncast.</strong></p>
<ol>
<li>You are <strong>not</strong> running on a VPS provided to you by a hosting provider, as shared virtual servers do not allow for direct access to hardware.</li>
<li>You have compatible hardware and have direct access to it.</li>
<li>You installed and configured any drivers and libraries needed to take advantage of your hardware.</li>
<li>You have a copy of <code>ffmpeg</code> that is version 4.1.5 or greater that is specifically built to utilize these drivers and libraries.</li>
</ol>
<h2 id="things-to-keep-in-mind">Things to keep in mind</h2>
<ol>
<li>Most people won&rsquo;t be able to take advantage of this unless you&rsquo;re running your own hardware.</li>
<li>Just because a specific hardware accelerated codec shows in the Owncast admin <strong>does not mean your machine is configured to support it</strong>. It simply means Owncast believes that codec to be available.</li>
<li>Very little of what is required to get your hardware working has anything to do with Owncast. Any questions you have about your particular hardware should be directed to your hardware manufacturer or whoever provides the drivers and libraries to utilize it. There&rsquo;s likely a lot of information already online, so please do your research.</li>
</ol>
<h2 id="compatible-hardware">Compatible hardware</h2>
<h3 id="intel-graphics">Intel Graphics</h3>
<p>If you have Intel integrated graphics you may be able to use it using <a href="#va-api">VA-API</a>.</p>
<h3 id="nvidia-gpus">NVIDIA GPUs</h3>
<p>NVIDIA GPUs ship with an on-chip hardware encoder unit often referred to as NVENC. Separate from the CUDA cores, NVENC run encoding workloads without slowing the execution of graphics or CUDA workloads running at the same time.</p>
<p>As of July 2019 Kepler, Maxwell, Pascal, Volta and Turing generation GPUs support hardware encoding. Visit the <a href="https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new#Encoder">NVIDIA GPU Support Matrix</a> to verify your GPU is listed in the &ldquo;encoder&rdquo; list.</p>
<h3 id="amd-gpus">AMD GPUs</h3>
<p><a href="#va-api">VA-API</a> is supported on AMD and ATI GPUs by the <a href="https://is.gd/ZvSdpo">libva-mesa-driver</a>.</p>
<p>Note: ffmpeg 5 is not currently supported with VA-API. Please use a version less than 5. Read the <a href="https://github.com/owncast/owncast/issues/2071">issue</a> about this particular issue to learn more.</p>
<h2 id="compatible-codecslibraries">Compatible codecs/libraries</h2>
<!-- ### Intel QuickSync

"Intel Quick Sync Video" is the marketing name for the hardware video decoding and encoding features on Intel processors with integrated graphics. Processors with an Intel iGPU can be used to do hardware video encoding as long as you have \`libva\` installed and the processors iGPU supports the video codec and resolution you want to use.

Follow the instructions on Intel's site on [how to get QuickSync setup on Linux](https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-installation.html).

Links:

- [Setting up QuickSync on Ubuntu](https://wiki.ubuntu.com/IntelQuickSyncVideo)
- [Intel Graphics at Linux Reviews](https://linuxreviews.org/Intel_graphics) -->
<h3 id="va-api">VA-API</h3>
<p>VA-API (video acceleration API) is a layer to support hardware accelerated encoding on linux. You need the <code>libva</code> library installed for it to work. VA-API is not compatible with ARM chipsets.</p>
<p>Note: ffmpeg 5 is not currently supported with VA-API. Please use a version less than 5. Read the <a href="https://github.com/owncast/owncast/issues/2071">issue</a> about this particular issue to learn more.</p>
<p>Links:</p>
<ul>
<li><a href="https://linuxreviews.org/VAAPI">VA-API at Linux Reviews</a></li>
<li><a href="https://github.com/intel/media-driver/">Intel Media Driver for VA-API</a></li>
</ul>
<h3 id="nvidia-encoder-nvenc">NVIDIA Encoder (nvenc)</h3>
<p>Follow the instructions on the <a href="https://developer.nvidia.com/blog/nvidia-ffmpeg-transcoding-guide/">NVIDIA ffmpeg transcoding guide</a> to install all the required drivers and libraries. This requires installing a driver from the <a href="https://www.nvidia.com/en-us/drivers/">NVIDIA website</a>, Downloading and install the <a href="https://developer.nvidia.com/cuda-toolkit">CUDA toolkit</a>, <a href="https://github.com/FFmpeg/nv-codec-headers">downloading nv-codec-headers</a>, and building ffmpeg. Scroll to the section entitled <em>Hardware accelerated transcoding with FFmpeg</em> at the <a href="https://developer.nvidia.com/blog/nvidia-ffmpeg-transcoding-guide/">NVIDIA transcoding guide</a> for more information.</p>
<p>You may be able to find a pre-built version of ffmpeg that has <code>nvenc</code> support, however that&rsquo;s outside the scope of this document. You still need NVIDIA drivers regardless.</p>
<p>Links:</p>
<ul>
<li><a href="https://www.tal.org/tutorials/ffmpeg_nvidia_encode">Tal.org instructions on building ffmpeg with nvenc</a></li>
<li><a href="https://gist.github.com/ransagy/3f6f1a9e5ede6212425f3b36b136216e">Shell script that claims to automate the process on Ubuntu</a></li>
</ul>
<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">Note for OBS users: It has been found that enabling nvenc while running the OBS auto-configuration wizard can result in errors. If you intend to run this configuration wizard against your Owncast server you may need to turn off nvenc temporarily in your Owncast settings while running it.</div>
</div>
<h2 id="ffmpeg">ffmpeg</h2>
<p>Once your system is configured to use the correct drivers and libraries required you&rsquo;ll need to make sure your copy of <code>ffmpeg</code> supports it.</p>
<p>Verify you have ffmpeg installed that&rsquo;s at least version 4.1.5.</p>
<pre tabindex="0"><code>$ ffmpeg -version
ffmpeg version 4.1.6-1~deb10u1+rpt1 Copyright (c) 2000-2020 the FFmpeg developers
built with gcc 8 (Raspbian 8.3.0-6+rpi1)
</code></pre><p>Verify the codec you expect to use is enabled in your version of ffmpeg.</p>
<pre tabindex="0"><code>$ ffmpeg -hide_banner -codecs | grep 264
 DEV.LS h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (decoders: h264 h264_v4l2m2m h264_mmal ) (encoders: libx264 libx264rgb h264_omx h264_v4l2m2m h264_vaapi )
</code></pre><p>If the codec you hope to use is not in this list then you may need to build your own copy of ffmpeg that supports it.</p>
`},{id:27,href:"/docs/video/",title:"Video",description:"Configure your video to manage the quality and hardware performance.",content:`<p>This document aims to outline what is being done to your content and the different knobs you can tweak to get the best output for your instance.</p>
<p>To see how your specific stream is performing, visit the <a href="/docs/metrics">Stream Health</a> page in the admin.</p>
<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">Keep in mind it's hard to give specific settings that will give you the best quality and performance with Owncast because people have different servers and requirements.</div>
</div>
<h2 id="overview">Overview</h2>
<ol>
<li>Configure your broadcasting software to send a stream to Owncast that is reasonably close to what you expect to send to your viewers. <a href="/docs/video/#how-you-configure-your-broadcasting-software-matters">How you configure your broadcasting software matters</a>. Don&rsquo;t tell OBS to send to Owncast at 7000k at 60fps if you only expect to support bitrates of 4000k and 2000k at 30fps.</li>
<li>Start with a single <a href="/docs/video/#things-you-can-configure">output configuration</a> with average settings. Test it. See how your hardware handles it. If you want to, and are able to, then add another and test that. Repeat until you arrive at the configuration you want to offer your viewers and that your hardware can handle.</li>
<li>If your hardware can&rsquo;t handle your current configuration then reduce the number of output variants to only a single one, <a href="/docs/video/#how-you-configure-your-broadcasting-software-matters">reduce the quality of video you&rsquo;re sending to Owncast</a>, reduce your <a href="/docs/video/#framerate">framerate</a>, and reduce the <a href="/docs/video/#cpu-usage">CPU usage</a></li>
</ol>
<h2 id="your-stream-can-be-played-outside-of-your-web-site">Your stream can be played outside of your web site.</h2>
<p>Because Owncast uses the HLS standard, almost any video player can play your stream. You can also build your own app that plays it. Commonly used video player such as Quicktime, VLC, and mpv can play your stream simply by using its base URL as <code>https://owncast.mydomain.com</code>. Alternatively, you can also access your stream directly on your server by putting the path of <code>/hls/stream.m3u8</code> into your player. For example: <code>https://owncast.mydomain.com/hls/stream.m3u8</code>.</p>
<h2 id="how-does-an-owncast-video-stream-work">How does an Owncast video stream work?</h2>
<p>Owncast takes your source stream and converts it to short, individual video segments. A list of these segments is supplied to your viewer&rsquo;s player and will read and play all the segments in order. This is using a specification called <a href="https://developer.apple.com/documentation/http-live-streaming">HLS</a> or HTTP Live Streaming. You can optionally generate multiple different qualities of video to allow lower bandwidth options. This is called <a href="https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming">Adaptive bitrate streaming</a>.</p>
<p>This video from Jon Dahl is gives a very good overview of internet video, starting with <em>&ldquo;what happens when you press play in your web browser?&rdquo;</em> and touching on every piece of the stack, backend and frontend. It translates very well to how Owncast works and is suggested if you want to learn more.</p>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://www.youtube.com/embed/rb83esfHnW8?start=539" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen title="YouTube Video"></iframe>
</div>

<p>In this case Owncast works as the Media encoder, Stream segmenter, and distribution web server. However <a href="/docs/storage">Owncast supports video being distributed via 3rd party storage as well</a>, so in that case the video segments would be distributed from there, instead.</p>


<div style="text-align: center;">
    <figure >
        
            <img src="https://docs-assets.developer.apple.com/published/88e87744a3/de18e941-81de-482f-843d-834a4dd3aa71.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div>
<h4 id="things-to-keep-in-mind">Things to keep in mind.</h4>
<ol>
<li>The more work you need done to convert the video from one size, quality or format to another the more it will slow everything else down.</li>
<li>The slower things go the slower the stream is provided to the user.</li>
<li>If stream is provided to the user too slowly they&rsquo;ll start seeing buffering and errors.</li>
</ol>
<p>Here&rsquo;s what knobs can be tweaked when trying to determine the quality or qualities you want to provide your user while balancing the amount of server resources you&rsquo;re consuming.</p>
<h2 id="things-you-can-configure">Things you can configure</h2>
<h3 id="bitrate">Bitrate</h3>
<p>The bitrate is the amount of data you send when you stream. A higher bitrate takes up more available internet bandwidth and create larger sized segments of video, making it take longer for viewers to download. Increasing your bitrate can improve your video quality, but only up to a certain point.</p>
<h3 id="resolution">Resolution</h3>
<p>Resolution refers to the size of a video on a screen. Like bitrates you can provide multiple different sizes for different cases, but asking to resize a video amounts in additional work that needs to be performed.</p>
<p>It&rsquo;s recommended if you have to change the size to only change the width <strong>or</strong> the height, and it&rsquo;ll keep the correct aspect ratio for you. If you change both the width and the height you may be changing the aspect ratio of the video you may end up with a squished picture if you don&rsquo;t set it correctly.</p>
<h3 id="framerate">Framerate</h3>
<p>Framerate is the number of frames per second in the video. Owncast defaults to 24fps, but other common framerates are 30 or 60. Increasing the framerate will use more CPU on your server, and more bandwidth for your users as more frames of video have to be processed and made available to your viewers any given second.</p>
<h3 id="cpu-usage">CPU Usage</h3>
<p>The more CPU you use the better the output image will be, or the smaller of a file the output will be for the same quality. However, you will need to balance the amount of CPU you have available with the amount you can use to process video.</p>


<p>If your hardware is being maxed out then your video may not be processed and delivered fast enough to keep up with the real-time requirements of live video.</p>
<p>Each stream output quality adds significant CPU usage and slows down the overall generation of video segments. It&rsquo;s generally advised to start with one output, and then add additional, one at a time, to see how it impacts your CPU usage.</p>
<p>If your CPU is being over-utilized, here are some steps you can try taking to resolve this.</p>
<ol>
<li>You may have too many video outputs defined in your settings. Try limiting yourself to a single output, and go from there.</li>
<li>Change your settings to use <a href="/docs/encoding/#cpu-usage">less cpu</a>.</li>
<li>Experiment with reducing the bitrate and framerate of your video.</li>
<li>If you&rsquo;ve gone down to a single output, changed to using less cpu, and experimented with different qualities in your broadcasting software, it&rsquo;s possible the server you&rsquo;re running Owncast is just not powerful enough for the task and you might need to try a different environment to run this on.</li>
<li>For your highest quality, match your Owncast server output bitrate exactly to what your broadcasting software is sending to minimize the amount of work your server has to do.</li>
<li>If you find you cannot accomplish encoding of any sort due to your server hardware, you may want to experiment with enabling <a href="/docs/video/#video-passthrough">video passthrough</a>, where your video is not re-encoded. However, this may not be a solution in all environments and there are often side effects. <a href="/docs/video/#video-passthrough">Read more</a>.</li>
</ol>
<p>In general, the easiest way to save CPU is to decrease the input size, decrease the output size, or both.</p>



<p>One easy optimization for CPU usage is to make sure your inbound video matches your highest output quality.</p>
<p>The highest bitrate, resolution and framerate quality you have configured in Owncast to offer your viewers should match what you&rsquo;re sending Owncast in your broadcasting software to reduce the amount of extra CPU work it needs to do. Start with your highest quality matching your broadcasting software and then go from there. Lower qualities, of course, should be offered for people with slower network connections or are geographically distant.</p>

<h3 id="latency-buffer">Latency Buffer</h3>
<p>You have some control over the live latency between the broadcaster and the viewer. While it&rsquo;s completely understandable to want to have as little latency as possible you may need to increase the latency buffer if you&rsquo;re experiencing issues. In general the lower the latency the less buffer is available for any possible slow transfers, network blips or errors.</p>
<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">If you require real-time, video conferencing style latency you may want to look for a different solution that doesn't use HLS video, as this scaling and distribution model will never get to sub-second levels.</div>
</div>
<h3 id="player-lower-latency-mode">Player Lower Latency Mode</h3>
<p>For some browsers, a &ldquo;Lower latency&rdquo; option is available in the web player. This should be seen as an experimental feature that will improve over time. If you turn it on and experience a negative playback experience with increased buffering you will probably want to turn it off.</p>
<span class="version-support">
  Experimental player lower latency mode was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.12">Owncast 0.0.12</a>.
</span>

<h3 id="video-passthrough">Video Passthrough</h3>
<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">Turning on video passthrough may make your stream unplayable or unreliable, and is not recommended. Read about Video Passthrough before turning it on and learn about the risks involved.</div>
</div>


<p><strong>Note: This is generally not recommended and can often cause playback issues for your viewers.</strong></p>
<p>This is an advanced setting that most people should not use.</p>
<p>Owncast has an optional setting to turn off re-encoding of your inbound stream, potentially saving substantial hardware utilization and supporting a higher quality stream with less resources. <span style="color: red;"> <strong>However</strong>, because your video will not be re-encoded it&rsquo;s possible that certain video from certain sources may end up <strong>not being playable at all</strong></span>. This is the risk of enabling this.</p>
<p>To enable, visit the advanced settings for a specific stream output. You can turn on &ldquo;Video Passthrough&rdquo;.</p>
<ol>
<li>Turn it on if you require it.</li>
<li>Test it.</li>
<li>If your video won&rsquo;t play, <strong>then turn it off</strong>.</li>
<li>Only one output should be set as &ldquo;passthrough&rdquo;.</li>
</ol>
<p>Because enabling Passthrough tells Owncast to not encode your video at all, your stream is at the mercy of what your broadcasting software is sending, and that is often not highly compatible with live streaming. For example your live latency may be substantially higher than expected because the stream is not able to be broken up into the specifically sized chunks, as expected. This can also cause issues when switching between different video qualities. For example, switching between a passthrough quality and an properly encoded quality. Worst case your stream may not be playable at all with passthrough enabled.</p>
<p><strong>Drawback</strong>: Passthrough bypasses the Owncast video encoding pipeline, leading to video that is not processed for live streaming. This can lead to unexpected results <strong>including longer than expected latency</strong>, skips or &ldquo;blips&rdquo; in video playback. Or worst case, the video is not playable at all. <strong>This setting is not encouraged.</strong></p>

<h2 id="audio">Audio</h2>
<p>What you&rsquo;re sending from your broadcasting software is generally reasonable and additional conversion isn&rsquo;t required, even for low-bandwidth viewers. Owncast will not change the audio stream and instead just pass it along to the end users to save additional work being performed.</p>
<h2 id="how-you-configure-your-broadcasting-software-matters">How you configure your broadcasting software matters.</h2>
<p>You will want to configure your broadcasting software to match the highest quality you can offer your viewers. <strong>That means if your Owncast server can only handle 720p@2500k you should not configure your broadcasting software to send 1080p@6000k</strong>. The more conversion work you ask Owncast to do the more resources it will use on your server, making it even harder to offer the best qualities to your viewers.</p>
<p>If you find yourself trying to squeeze better performance out of Owncast then try setting your broadcasting software to a lower quality as well as lowering the quality in your Owncast instance.</p>
<p>Read more about <a href="/docs/broadcasting/">configuring your broadcasting software</a>.</p>
<h2 id="hardware-accelerated-video-encoding">Hardware accelerated video encoding</h2>
<p>If you are running on physical hardware you may be able to increase the performance of your Owncast instance by using your hardware along with a compatible codec, taking the heavy load off of your CPU. There is no guarantee all hardware configurations, drivers or operating systems will work and it may take some effort on your part to install all of the additional software required to get it working. Read more about what is supported, and how, at our <a href="/docs/codecs">hardware accelerated encoding with additional codecs</a> document.</p>
<h2 id="resource-and-requirement-examples">Resource and requirement examples</h2>
<p>Visit the <a href="/docs/resources-requirements/">resources and requirements</a> page to see some examples of what you can expect from your server hardware and network connection and how it may affect your viewers.</p>
`},{id:28,href:"/docs/api/",title:"API Documentation",description:null,content:`<p>Owncast offers an API to integrate its services in other interfaces, like the <a href="https://github.com/owncast/owncast-admin">Owncast Admin Panel</a>.</p>
<h2 id="internal-vs-external-apis">Internal vs. External APIs</h2>
<p>API endpoints are split up between the internal (including admin) and external (aka integration) APIs. The internal APIs are used by the Owncast server itself to function. Some are required by just the web frontend, and others are used for management of the server via the admin interface. The external (or integrations) APIs are used by external clients such as integrations, bots, or custom tooling to perform actions and build additional functionality.</p>
<p>Internal APIs can change frequently as they are required to be in sync with the feature sets and requirements for the current version of Owncast. The goal of external APIs are to allow external tools to be integrated into Owncast without major changes breaking them. They are also secured via an access token instead of your admin password so you don&rsquo;t have to hand over full access to your Owncast server, and you can revoke access to external integrations at any time.</p>
<h3 id="can-you-use-admin-and-internal-apis-in-your-tools">Can you use admin and internal APIs in your tools?</h3>
<p>If you&rsquo;re building for yourself, then it&rsquo;s your server and you can absolutely do whatever you want! However, the downside of using admin APIs is you need to share your admin password with whatever tooling is using it. This is not recommended.</p>
<p>Additionally if you&rsquo;re using the APIs that are required to drive the Owncast web frontend, those can change at any time and break whatever you&rsquo;re building. So especially if you&rsquo;re building integrations or third party tooling that other people are to use it&rsquo;s highly not recommended to use admin APIs, as they&rsquo;d have to hand over their admin password, or to use the internal APIs as they can change between versions and break your integration.</p>
<h2 id="the-latest-api">The latest API</h2>
<h3 id="release">Release</h3>
<p>The following documents the latest officially released APIs.</p>



  
  


<a  href="/api/latest"   target="_blank"  class="book-btn">
  Latest Released API
</a>

<h3 id="development">Development</h3>
<p>If you&rsquo;re developing against the <code>master</code> branch of Owncast the following documentation may be helpful to you. Please mind that development versions may be unstable as they do not have the testing that Owncast releases endure.</p>



  
  


<a  href="/api/development"   target="_blank"  class="book-btn">
  Development
</a>

<h2 id="more">More</h2>
<p>Documentation for each release&rsquo;s APIs can be found with the release notes of each version.</p>



  
  


<a  href="/releases"   target="_blank"  class="book-btn">
  Releases
</a>

<p>You can also checkout the API documentation at any point from the <a href="https://github.com/owncast/owncast">git repository</a>.</p>
`},{id:29,href:"/docs/storage/",title:"Object Storage",description:"Use an external storage provider to distribute your Owncast video stream.",content:`<p>Instead of serving video directly from your personal server you can use a S3 compatible storage provider to offload the bandwidth and storage requirements elsewhere. This is not for permanent storage of recordings or archival purposes, just for live streams.</p>
<p>To learn more about how your bandwidth may be affected by your video configuration and how using object storage could help for some use cases, visit the <a href="/docs/resources-requirements/">resources and requirements</a> page.</p>
<p>If your storage provider is S3 compatible it will likely work with Owncast. Read the documentation for your provider to learn how to setup an object storage bucket, enable CORS, make the files public, and get the necessary credentials to provide to your Owncast configuration.</p>
<h2 id="configuration">Configuration</h2>
<ol>
<li>Visit your Owncast server setup page in the admin and view the Object Storage settings.</li>
<li>Enable it.</li>
<li>Visit your storage provider and create a new bucket.</li>
<li>Enter the bucket name, access key, secret key, and endpoint that your object storage provider&rsquo;s interface gave you into the Owncast settings. These have to be correct, so double check them. Contact your storage provider&rsquo;s support if you&rsquo;re not sure what these are.</li>
<li>Make sure your bucket is publicly accessible, and anybody can read files from it. Some storage providers may set your bucket as private by default, so you may need to change this setting.</li>
<li>If your storage provider requires you to setup any kind of <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a> policy in order for your files to be accessed, make sure you do that. Visit your object storage provider&rsquo;s documentation to learn how to configure your CORS policy, as it&rsquo;s different for every provider. It&rsquo;s generally a good idea to allow all origins, but you can restrict it to your Owncast server if you have a specific need to do that, and you don&rsquo;t anticipate using your stream in other web pages. If your stream is not working and your browser console error log shows errors about <code>CORS</code> or <code>Access-Control-Allow-Origin</code>, this is likely the problem. This is often very common, so make sure your bucket is setup correctly.</li>
</ol>
<h3 id="optional-settings">Optional settings</h3>
<p>Most people won&rsquo;t need to touch these settings, but they&rsquo;re available if you need them.</p>
<ul>
<li><strong>ACL</strong>: If you are required to specify a specific access control option when uploading files, you can specify it here. Refer to your object storage provider&rsquo;s documentation.</li>
<li><strong>Path Prefix</strong>: If you want to store your files in a subdirectory within your bucket, you can specify that here. For example, if you want to store your files in a folder called <code>mystream</code>, you would enter <code>mystream</code> here. This is only useful if you&rsquo;re using a single bucket for multiple purposes, or have multiple Owncast servers pointing to the same bucket.</li>
<li><strong>Path-style configuration</strong>: Some storage providers, such as Oracle Cloud Objects, require the &ldquo;path-style&rdquo; configuration option to be enabled. Refer to your storage provider documentation to learn if this is required.</li>
</ul>
<span class="version-support">
  Path style configuration was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.11">Owncast 0.0.11</a>.
</span>

`},{id:30,href:"/docs/directory/",title:"The Directory",description:"The Owncast Directory is a centralized list of streams for people to discover.",content:`<p>To help people discover streams by people using Owncast we have an optional Owncast directory you can add yourself to.</p>
<ol>
<li>Visit the <strong>&ldquo;General&rdquo;</strong> settings in the admin.</li>
<li>Set the public URL to your Owncast instance that you want people to be linked to.</li>
<li>Set the <strong>&ldquo;About&rdquo;</strong> with a brief description of your stream.</li>
<li>Set the <strong>tags</strong> associated with the content you stream.</li>
<li>Mark if your content is <em>Not Safe For Work</em> (nsfw).</li>
</ol>
<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">This directory is operated as a complimentary service by the Owncast project to share people's streams. There is no obligation to list any specific server or topic. Any server can be removed at any time for any reason.</div>
</div>
<h2 id="if-your-server-is-not-showing-up-in-the-directory">If your server is not showing up in the directory</h2>
<ol>
<li>It&rsquo;s opt-in, so make sure you follow the <a href="/docs/directory">configuration directions</a> to enable the directory for your server.</li>
<li>It will take approximately 5min for your server to show up the first time you stream after enabling this feature.</li>
<li>You may want to run your server with <code>owncast --enableVerboseLogging</code> to see what errors show up.</li>
<li>If you used to be listed, but no longer show up you may need to reset your registration to the server in the admin&rsquo;s Server Settings.</li>
<li>If you recently changed the URL of your server reset your registration in your Server Settings.</li>
<li>If there&rsquo;s some issue that&rsquo;s causing you not to be listed <a href="https://github.com/owncast/owncast/issues">please file a GitHub issue</a> so we can help troubleshoot or reset your registration with the directory.</li>
</ol>
<span class="version-support">
  Owncast directory was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.3">Owncast 0.0.3</a>.
</span>

`},{id:31,href:"/docs/viewers/",title:"Viewer details",description:null,content:`<p>Owncast can display high-level geographic information about your current viewers if you enable it in your instance.</p>
<p>Your server can optionally use the <a href="https://dev.maxmind.com/geoip/geoip2/geolite2/">MaxMind GeoLite2 Database</a>. If you provide your own free copy of the database it will be used. Perform the following in order to add this feature.</p>
<ol>
<li><a href="https://www.maxmind.com/en/geolite2/signup">Create a free account</a> with MaxMind.</li>
<li>Wait for an email and follow the link to your account.</li>
<li>Under <code>Database Products and Subscriptions</code> click <code>Download Databases</code>.</li>
<li>Download <code>GeoLite2 City (GeoIP2 Binary .mmdb)</code>.</li>
<li>Unzip the file and place the <code>GeoLite2-City.mmdb</code> file into the <code>data</code> directory of your Owncast server. Create this directory if needed.</li>
<li>Restart your Owncast service.</li>
</ol>
<span class="version-support">
  Location support was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.3">Owncast 0.0.3</a>.
</span>

`},{id:32,href:"/docs/scaling/",title:"Scaling Owncast",description:"A place to start when needing to increase the capacity of your server.",content:`<h2 id="disclaimer">Disclaimer</h2>
<p>Owncast works great out of the box as a personal streaming service. The ease of install and all-in-one architecture allows for people to get up and running quickly. The downside of this is it requires a bit more thought around large deployments, as you can&rsquo;t just run more copies of Owncast for scale.</p>
<p>If you are not familiar with the topics below, or you don&rsquo;t feel comfortable with the following steps it&rsquo;s unlikely you should be taking on the additional responsibility of a larger deployment of any service. <strong>Basic system administration experience and understanding of the architecture is generally expected when trying to squeeze additional performance out of anything</strong>, and this might not be for you. Don&rsquo;t feel bad. <strong>Owncast will still work great for you out of the box</strong>, but you might want to acquire some professional help if you need something more than that.</p>
<h2 id="video">Video</h2>
<h3 id="object-storage">Object Storage</h3>
<p>The first step for scaling your video to a large number of concurrent viewers is to use the built-in support for <a href="/docs/storage">external storage services</a>.</p>


<p>If the core problem is your server isn&rsquo;t able to handle your number of viewers you can take advantage of 3rd party object storage providers so your viewers will download the video from there instead of your server. This means if you have 1 or 1000 viewers the video video traffic from your server will be exactly the same. Keep in mind each viewer will still be accessing your server directly for chat.</p>
<p>This allows you to generate the video on your Owncast server, but serve it from a provider who has unlimited bandwidth and capacity at a low cost.</p>
<p>With this setup you don&rsquo;t need extra CPU or a more powerful server in order to support more viewers, as they don&rsquo;t technically touch your server once the video begins.</p>
<p><a href="/docs/storage">Read more about configuring external storage with Owncast</a>.</p>

<h3 id="content-delivery-networks-cdns">Content Delivery Networks (CDNs)</h3>


<p>To support more people all around the world a CDN (content delivery network) is generally the next step. Putting a CDN in front of your video allows your video to be distributed by servers that are geographically closer to the viewer.</p>
<p><a href="/docs/cdns">Read more about using a CDN with Owncast</a>.</p>

<h2 id="chat">Chat</h2>
<p>When scaling chat you&rsquo;re limited by what your single server will be able to handle as far as open connections. For most people the standard configuration is likely going to suffice, as it&rsquo;s been tested to thousands of concurrent clients.</p>
<p>Owncast will automatically increase the amount of concurrent sockets that your operating system will allow. However, if you still get the <code>too many open files</code> error it&rsquo;s because your <code>ulimit</code> value is lower than the number of open resources Owncast is trying to to use. You will want to have a more powerful server (cpu, ram) when raising the max limit and handle more chat connections.</p>
<p>You can increase concurrent connections by using the <code>ulimit</code> command or editing your system files. <a href="https://www.learnitguide.net/2015/07/how-to-increase-ulimit-values-in-linux.html">Here is an overview of the different limits and how to change them</a>. It&rsquo;s beyond the scope of this documentation to go into detail of what numbers you should use and where to put them.</p>
`},{id:33,href:"/docs/backups/",title:"Backups",description:"Owncast makes period backups of your data that can be restored.",content:`<p>Owncast will create a backup of your data periodically. It can be found in your <code>backup</code> directory as <code>owncastdb.bak</code>. You can add this to your normal system backups to keep your Owncast data safe.</p>
<span class="version-support">
  Data backup was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.6">Owncast 0.0.6</a>.
</span>

<h2 id="restore">Restore</h2>
<p>Restoring an Owncast backup file will bring you back to the time the backup was created. This is useful if you want to move data to another machine, want to go back in time for some reason, or there&rsquo;s some type of problem you&rsquo;re looking to resolve.</p>
<ol>
<li>Stop Owncast from running.</li>
<li>Run <code>./owncast --restoreDatabase &lt;backupfile&gt;</code></li>
<li>Restart Owncast as you normally would. It will be using the restored data.</li>
</ol>
<span class="version-support">
  Data restore was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.6">Owncast 0.0.6</a>.
</span>

`},{id:34,href:"/docs/old_troubleshooting/",title:"",description:null,content:`<h2 id="cpu-and-ram-usage-alerts">CPU and RAM usage alerts</h2>


<p>If your hardware is being maxed out then your video may not be processed and delivered fast enough to keep up with the real-time requirements of live video.</p>
<p>Each stream output quality adds significant CPU usage and slows down the overall generation of video segments. It&rsquo;s generally advised to start with one output, and then add additional, one at a time, to see how it impacts your CPU usage.</p>
<p>If your CPU is being over-utilized, here are some steps you can try taking to resolve this.</p>
<ol>
<li>You may have too many video outputs defined in your settings. Try limiting yourself to a single output, and go from there.</li>
<li>Change your settings to use <a href="/docs/encoding/#cpu-usage">less cpu</a>.</li>
<li>Experiment with reducing the bitrate and framerate of your video.</li>
<li>If you&rsquo;ve gone down to a single output, changed to using less cpu, and experimented with different qualities in your broadcasting software, it&rsquo;s possible the server you&rsquo;re running Owncast is just not powerful enough for the task and you might need to try a different environment to run this on.</li>
<li>For your highest quality, match your Owncast server output bitrate exactly to what your broadcasting software is sending to minimize the amount of work your server has to do.</li>
<li>If you find you cannot accomplish encoding of any sort due to your server hardware, you may want to experiment with enabling <a href="/docs/video/#video-passthrough">video passthrough</a>, where your video is not re-encoded. However, this may not be a solution in all environments and there are often side effects. <a href="/docs/video/#video-passthrough">Read more</a>.</li>
</ol>
<p>In general, the easiest way to save CPU is to decrease the input size, decrease the output size, or both.</p>

<h2 id="buffering-and-video-playback-issues">Buffering and video playback issues</h2>
<p>Many things can be responsible for buffering and issues with the video playback. Here are some things to look into.</p>
<ol>
<li>Make sure your <strong>hardware is not maxed out</strong> as detailed above.</li>
<li>Make sure your broadcasting computer is broadcasting live video reliably. If your own computer or network connection is having a hard time getting video to the internet then viewers will be stuck in a buffering state. <strong>Reduce the bitrate, resolution and/or framerate in your broadcasting software</strong> on your computer or mobile device if needed.</li>
<li>Try <strong>increasing your latency buffer</strong> in your settings. This will start the user further behind live but give the client more playable video before it gets stuck waiting for the live edge.</li>
<li><strong>Change your video settings</strong> to use <a href="/docs/encoding/#cpu-usage">less cpu</a> for encoding video. Possibly <a href="/docs/video/#video-passthrough">try passthrough</a>.</li>
<li>Reduce your <a href="/docs/configuration/#video-quality">stream quality settings</a> to a single output and a lower <a href="/docs/encoding/#bitrate">bitrate</a>. Experiment with increasing the bitrate and adding another optional stream output once you find settings that work for you.</li>
<li>If some of your viewers have no issues, but others are, you simply might need to add an additional bitrate output to your video configuration to accommodate more network conditions. Some people are geographically further away from you and might be getting your stream slower than others. Adding a lower quality stream output for these people often helps a lot.</li>
<li>If you are using external storage, <strong>make sure you&rsquo;re able to upload to this storage service fast enough</strong>. See below.</li>
</ol>
<p>To gain some insight into how your stream is performing for people, put your stream URL (https://yourserver/hls/stream.m3u8) into <a href="https://hlsanalyzer.com/">HLS Analyzer</a> to get a nice overview. You can see any errors or warnings from the end user&rsquo;s point of view by looking at its results.</p>
<h2 id="slow-uploads-to-external-storage">Slow uploads to external storage</h2>
<p>If you have a slow upload connection, or are uploading to an external storage service that is too far away, or not optimized for fast uploads, you may run into an issue where it takes too long to get the video segments uploaded, ultimately not making them available fast enough for them to be used.</p>
<ol>
<li>Determine if there&rsquo;s another endpoint for your storage service that might be geographically closer to you.</li>
<li>Use a storage service that&rsquo;s as close (physically and logically) to where your Owncast instance is. For example if if you&rsquo;re on an AWS machine, use a S3 bucket in the same region. If you&rsquo;re on Digital Ocean, try DO Spaces. But maybe don&rsquo;t use DO Spaces if you&rsquo;re on a Linode machine, use Linode Object Storage instead. Run owncast with <code>--enableVerboseLogging</code> to see if you get any slow upload warnings.</li>
<li>Try to increase your upload speed from your server provider.</li>
<li>Find out if your storage service offers something like <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html">AWS&rsquo;s Transfer Acceleration</a> to (possibly) try to increase the speed of uploads.</li>
<li>Reduce the quality of your video so the video segments are smaller and will take less time to upload. See the above tips for speeding up encoding.</li>
</ol>
<h2 id="reducing-the-delay-between-the-viewer-and-live">Reducing the delay between the viewer and live</h2>
<p>Try decreasing your latency level in the admin. This will keep the user closer to live, but give the client less playable segments to work with, possibly <strong>reducing the resiliency for errors</strong> and network speed issues. If you have a machine that is able to process video quickly you may be able to get down to only a handful of seconds of latency, but with little room for error.</p>
<p>It&rsquo;s up to you to decide you want lower delays over <strong>less reliability</strong> or a more reliable stream with additional delay.</p>
<p>If you are using <strong>Video Passthrough</strong> in your video configuration it will likely <strong>increase</strong> your latency. Because you&rsquo;re telling Owncast not to re-encode your video it can&rsquo;t optimally segment your video into the sized chunks required to manage your latency. If you really want to micro-manage latency then you&rsquo;re better off turning off Passthrough.</p>
<h2 id="chat-is-disabled">Chat is disabled</h2>
<p>The chat is only enabled when a stream is active. This is to stop drive-by spammy chat messages by people when no stream is taking place.</p>
<p>If you&rsquo;re using a proxy in front of your Owncast instance make sure it is configured properly to support websockets. By default some do not pass along the websocket properly. Read <a href="/docs/sslproxies">your proxy documentation</a> to make sure websocket support is configured properly to support Owncast chat.</p>
<h2 id="if-you-are-immediately-disconnected-and-your-stream-wont-begin">If you are immediately disconnected and your stream won&rsquo;t begin.</h2>
<ol>
<li>Make sure you&rsquo;re running a supported version of ffmpeg. <a href="https://ffmpeg.org/download.html">Download ffmpeg 4.1.5 or above</a>.</li>
<li>Look at your owncast logs in the console or your admin. There may be specific error messages to tell you what you can do next.</li>
<li>Take a look at <code>transcoder.log</code> for detailed logging that you can provide when asking for help if you don&rsquo;t see anything in the Owncast logs.</li>
<li>Make sure your copy of ffmpeg was not installed via Snap packages, as the sandboxing of Snap distributed software isn&rsquo;t compatible in this case. If you see the error <code>Error: unable to open display</code> in <code>transcoder.log</code>, this might be your problem.</li>
</ol>
<h2 id="misc-video-issues">Misc video issues</h2>
<p>If you&rsquo;re running into random video stability issues start by looking at some of the following:</p>
<ol>
<li>Make sure you have <a href="/docs/video/#video-passthrough">video passthrough</a> <strong>disabled</strong>. I know you want to keep it on, but if you&rsquo;re having issues <strong>TURN IT OFF</strong>. If that doesn&rsquo;t fix it, then you can turn it back on later when you figure out the problem.</li>
<li>Look at your Owncast logs as well as <code>transcoder.log</code> to see if there are any errors that might be helpful.</li>
<li>To troubleshoot try a different source and/or a different player so when you ask for help you can know that it works for X but doesn&rsquo;t work for Y. Your stream is available at <code>/hls/stream.m3u8</code> so try putting that into VLC, Quicktime, etc.</li>
<li>If you&rsquo;re using a third party re-streaming, or web based streaming service, try streaming without it to see if it works. Again this helps when asking for help to let us know where the issue is.</li>
</ol>
<h2 id="your-software-says-your-key-is-incorrect">Your software says your key is incorrect.</h2>
<p>If your broadcasting software says your streaming key is incorrect, but you&rsquo;re sure it&rsquo;s not, verify you&rsquo;re not using any <a href="https://tools.ietf.org/html/rfc3986#section-2.1">URL-unsafe characters</a> in your key. Characters such as <code>[ ] { } ? | \\ / ” % ~ # &lt; &gt;</code> are particularly problematic as your broadcasting software may not be encoding them properly.</p>
<h2 id="your-stream-looks-low-quality">Your stream looks low-quality</h2>
<p>Your stream, at the very least, is only as good as what you&rsquo;re sending to Owncast. So make sure you&rsquo;re sending from your broadcasting software at a quality that you&rsquo;re happy with. You may also want to increase the amount of CPU being used to process the video on your Owncast server. As you go lower you will visibly see the quality degrade. However, make sure your server can handle more CPU being used or you&rsquo;ll experience different problems.</p>
<h2 id="server-is-not-showing-up-in-the-directory">Server is not showing up in the directory</h2>
<p>If you&rsquo;ve enabled the directory in your admin settings, <a href="/docs/directory/#if-your-server-is-not-showing-up-in-the-directory">look at some next steps</a> if it&rsquo;s not working.</p>
<span class="version-support">
  Owncast directory was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.0.3">Owncast 0.0.3</a>.
</span>

<h2 id="streams-without-audio-are-currently-not-supported">Streams without audio are currently not supported</h2>
<p>If you&rsquo;re streaming content that has no audio component (such as a camera with no microphone, for example) you may run into issues. You&rsquo;re only likely to run into this if you&rsquo;re building a stream manually through something like ffmpeg. And in this case you can insert an audio stream that&rsquo;s empty to resolve the issue.</p>
<p>An example:
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line"><span class="cl">ffmpeg -input_format h264 -f video4linux2 -s 1920x1080 -i /dev/video0 -f lavfi -i anullsrc -c:v copy -c:a aac -shortest -f flv rtmp://192.168.0.10/live/abc123</span></span></code></pre></div></p>
<h2 id="resetting-a-lost-stream-key">Resetting a lost stream key</h2>
<p>If you change your stream key and forget to save it, or you lose it somehow, you can reset it on the command line by stopping owncast, and then running the following on the command line:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line"><span class="cl">./owncast --streamkey yournewstreamkey</span></span></code></pre></div>
<h2 id="restoring-a-backup">Restoring a backup</h2>
<p>Owncast will backup its database periodically. You can keep these backups and restore them if needed. <a href="/docs/backups">Learn more about backups</a>.</p>
`},{id:35,href:"/docs/custom-javascript/",title:"Adding custom Javascript",description:"Run custom Javascript on your Owncast web page.",content:`<p>If you have some Javascript you need to run when your Owncast web page loads, you can add it to the Javascript editor under the <strong>General</strong> settings page in the admin.</p>
<span class="version-support">
  Adding custom javascript was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.1.0">Owncast 0.1.0</a>.
</span>

<p>Some examples of reasons you might need this:</p>
<ul>
<li>Adding privacy-respecting analytics.</li>
<li>Initializing a payment processor you have embedded on your page.</li>
<li>Use Javascript to manipulate the interface.</li>
</ul>
<h2 id="warning">Warning</h2>
<p>Double check your Javascript. Any incorrect syntax or errors that you insert into the page may create errors and stop the page from loading or functionality from working.</p>
`},{id:36,href:"/docs/appearance/",title:"Customizing appearance",description:"Customize the appearance of your Owncast instance.",content:`<span class="version-support">
  Appearance customization was first supported in <a href="https://github.com/owncast/owncast/releases/tag/v0.1.0">Owncast 0.1.0</a>.
</span>

<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">TODO: Share some examples of setting appearance via CSS and the admin.</div>
</div>
<h2 id="css-selectors">CSS Selectors</h2>
<ul>
<li><code>header</code></li>
<li><code>footer</code></li>
<li><code>#global-header-text</code> The text in the header.</li>
<li><code>#offline-banner</code> The banner that appears when the stream is offline.</li>
<li><code>#custom-page-content</code> The custom content of the page.</li>
<li><code>#notify-button</code> Button to display the notify modal.</li>
<li><code>#follow-button</code> Button to display the follow modal.</li>
<li><code>#followers-collection</code> The collection of followers.</li>
<li><code>#modal-container</code> The container for the modals.</li>
<li><code>#chat-container</code> The container for the chat.</li>
<li><code>.chat-message_user</code> A user-sent chat message.</li>
<li><code>.chat-message_system</code> A system-sent chat message.</li>
<li><code>.chat-message_social</code> A social message from the Fediverse.</li>
<li><code>.followers-follower</code> A single Follower in the followers collection.</li>
</ul>
<h2 id="css-variables">CSS Variables</h2>
<p>You can override the values assigned to CSS variables manually by setting them in the CSS editor in the admin.
You can find a list of <a href="https://owncast.online/components/?path=%2Fdocs%2Fowncast-styles-colors--default-theme">variable names</a> you can override.</p>
<p>For example, if you&rsquo;d like to make all action items (links, buttons) red, button borders green, and change the body font to a <code>serif</code> font, you can set the following CSS variables as follows:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-css" data-lang="css"><span class="line"><span class="cl"><span class="p">:</span><span class="nd">root</span> <span class="p">{</span>
</span></span><span class="line"><span class="cl">  <span class="nv">--theme-color-action</span><span class="p">:</span> <span class="kc">red</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">  <span class="nv">--theme-color-components-primary-button-border</span><span class="p">:</span> <span class="kc">green</span><span class="p">;</span>
</span></span><span class="line"><span class="cl">  <span class="nv">--theme-text-body-font-family</span><span class="p">:</span> <span class="kc">serif</span><span class="p">;</span>
</span></span><span class="line"><span class="cl"><span class="p">}</span>
</span></span></code></pre></div>`},{id:37,href:"/docs/",title:"Documentation",description:null,content:`<p>For most people Owncast will be completely usable out of the box without additional configuration. Simply following the <a href="/quickstart">Quickstart</a> will have you streaming in minutes.</p>
<p>There are, however, handfuls of items you can configure to tweak the <a href="website">content of your page</a>, the <a href="video">video quality</a>, server performance and more.</p>
<p>You can also extend Owncast&rsquo;s functionality by building your own bots, overlays, tools and integrations by taking advantage of the <a href="/thirdparty">third party APIs</a>.</p>
<p>Some things you might be interested in:</p>
<ol>
<li><a href="/faq">FAQ</a></li>
<li><a href="/docs/storage">Using an external storage provider instead of your own bandwidth</a></li>
<li><a href="/docs/video">Customize your video output</a></li>
<li><a href="/docs/sslproxies">Enable SSL using a web proxy</a></li>
</ol>
`},{id:38,href:"/docs/broadcasting/jitsi/",title:"Jitsi",description:"Jitsi is an open source video conferencing provider.",content:`<p><a href="https://jitsi.org">Jitsi</a> is both a video conferencing provider and a software suite. It is open source and can be self-hosted. It is also available as a service at <a href="https://meet.jit.si">meet.jit.si</a>.</p>
<ol>
<li>Visit your Jitsi meeting page.</li>
<li>Click on the three dots in the lower right.</li>
<li>Select &ldquo;Start live stream&rdquo;</li>
</ol>


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/jitsi-1.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div>
<ol start="4">
<li>In the &ldquo;Start a live screen&rdquo; modal put your full Owncast RTMP in the &ldquo;Live stream key&rdquo; field. This would be in the format of rtmp://your-owncast-server/live/yourkey.</li>
</ol>


<div style="text-align: center;">
    <figure >
        
            <img src="/docs/img/jitsi-2.png" width="100%" loading="lazy" />
            
        
    </figure>
    </div>
<ol start="5">
<li>Note that the error &ldquo;Live stream key may be incorrect&rdquo; will display. This is expected and can be ignored.</li>
</ol>
`},{id:39,href:"/docs/watching-on-tvs/",title:"Watching an Owncast Stream on Televisions",description:"The web isn't the only option for watching an Owncast stream.",content:`<div class="alert alert-warning d-flex" role="alert">
  <div class="flex-shrink-1 alert-icon">💡</div>
  <div class="w-100">This document is a work in progress. Please submit any applications or methods that work for you.</div>
</div>
<p>There are numerous ways for you to watch an Owncast live stream on many
different devices. On this page we&rsquo;ll try to share some.</p>
<p><strong>Note:</strong> Most of the applications listed on this page are not provided by, endorsed by, or supported by Owncast. You should make your own choices about what applications you choose to install. Products listed here are simply suggestions that have been tested and found to work with Owncast. Those that are built and provided by Owncast should be seen as side projects to assist viewers in watching more streams.</p>
<h2 id="watching-on-your-any-video-player-including-on-your-television">Watching on your any video player, including on your television</h2>
<p>Any application that supports HLS video will play back an Owncast stream. Install any video playback application for your platform of choice, and put in the URL <code>https://owncast.server/hls/stream.m3u8</code> to access the stream directly.</p>
<h2 id="browsing-the-directory">Browsing the directory</h2>
<p>If your application has <em>IPTV</em> or <em>M3U</em> support, you can also browse the directory directly from the application by adding <code>https://directory.owncast.online/api/iptv</code> to the application. Not all apps support this.</p>
<h2 id="device-and-platform-support">Device and Platform support</h2>
<h3 id="chromecast">Chromecast</h3>
<p><a href="https://support.google.com/chromecast/answer/3228332">Visit the official Chromecast documentation</a>.</p>
<ol>
<li>On your computer, open Chrome.</li>
<li>Visit the Owncast server you want to watch.</li>
<li>At the top right, click the More button and then Cast.</li>
<li>Choose the Chromecast device where you want to watch the content.</li>
<li>If you&rsquo;re already using the Chromecast, your content will replace what&rsquo;s on your TV.</li>
</ol>
<h3 id="appletv">AppleTV</h3>
<p>Owncasts for tvOS</p>
<ol>
<li>Install <a href="https://apps.apple.com/us/app/owncasts/id6451178968?platform=appleTV">Owncasts for tvOS</a> from the tvOS App Store.</li>
<li>Add your own Owncast server in the settings to watch any Owncast-powered live stream.</li>
</ol>
<p>VLC for tvOS</p>
<ol>
<li>Install <a href="https://www.videolan.org/vlc/download-appletv.html">VLC</a> from the tvOS App Store.</li>
<li>Visit the &ldquo;Network Stream&rdquo; tab.</li>
<li>Select the text input field.</li>
<li>Type the server you wish to watch. For example: <code>https://watch.owncast.online</code></li>
<li>Select it from the list.</li>
</ol>
<p>AirPlay</p>
<p><a href="https://support.apple.com/en-us/HT204289">Visit Apple&rsquo;s AirPlay documentation</a></p>
<ol>
<li>Open the Owncast stream you want to watch on your iPhone or Mac computer.</li>
<li>Play the Owncast stream.</li>
<li>Press the <em>AirPlay</em> button.</li>
<li>Select your AppleTV.</li>
</ol>
<p>Owncasts for iOS</p>
<ol>
<li>Install <a href="https://apps.apple.com/us/app/owncasts/id6451178968?platform=iphone">Owncasts for iOS</a> from the iPhone App Store.</li>
<li>Launch the application and browse the directory or add your own Owncast-powered live stream in the settings.</li>
<li>Begin playback of the live stream.</li>
<li>Press the AirPlay button and select your AirPlay compatible device.</li>
</ol>
<h3 id="amazon-fire-tv">Amazon Fire TV</h3>
<ol>
<li>Install <a href="https://www.amazon.com/VLC-Mobile-Team-for-Fire/dp/B00U65KQMQ">VLC for Amazon Fire TV</a> from the Amazon App Store.</li>
<li>Select &ldquo;Streams&rdquo; from the &ldquo;Browsing&rdquo; section.</li>
<li>Type in the name of the stream you wish to watch. For example: <code>https://watch.owncast.online</code>.</li>
<li>Select &ldquo;Next&rdquo;.</li>
</ol>
<h3 id="google-tv">Google TV</h3>
<ol>
<li>Install VLC from the Google Play store.</li>
<li>Select &ldquo;Streams&rdquo; from the &ldquo;Browsing&rdquo; section.</li>
<li>Type in the name of the stream you wish to watch. For example: <code>https://watch.owncast.online</code>.</li>
<li>Select &ldquo;Next&rdquo;.</li>
</ol>
<h3 id="roku">Roku</h3>
<p>AirPlay</p>
<p><a href="https://support.apple.com/en-us/HT204289">Visit Apple&rsquo;s AirPlay documentation</a></p>
<ol>
<li>Open the Owncast stream you want to watch on your iPhone or Mac computer.</li>
<li>Play the Owncast stream.</li>
<li>Press the <em>AirPlay</em> button.</li>
<li>Select your Roku.</li>
</ol>
<h3 id="lg-tvs-webos">LG TVs (WebOS)</h3>
<h3 id="samsung-tvs">Samsung TVs</h3>
<h2 id="browsing-the-owncast-directory-on-your-tv">Browsing the Owncast Directory on your TV</h2>
<p>Almost any application that supports adding <em>IPTV</em> or <em>M3U</em> playlists can support the directory.
Choose an application, and add <code>https://directory.owncast.online/api/iptv</code> as your playlist URL.</p>
<h3 id="appletv-1">AppleTV</h3>
<p>Owncasts for tvOS</p>
<ol>
<li>Install <a href="https://apps.apple.com/us/app/owncasts/id6451178968?platform=iphone">Owncasts for tvOS</a> from the tvOS App Store.</li>
<li>Launch the application and browse the directory.</li>
<li>Add your own private Owncast server in the settings if it is not listed in the directory.</li>
</ol>
<p>iPlayTV</p>
<ol>
<li>Install <a href="https://apps.apple.com/us/app/iplaytv-iptv-m3u-player/id1072226801">iPlayTV</a> from the tvOS App Store.</li>
<li>Visit Settings -&gt; Edit</li>
<li>For the <code>M3U</code> Playlist URL: <code>https://directory.owncast.online/api/iptv</code></li>
<li>Change the <code>Channels Refresh</code> to the lowest value it offers.</li>
</ol>
<a href="https://apps.apple.com/us/app/iplaytv-iptv-m3u-player/id1072226801">
    <img src="/images/appletv-itv-directory.jpg" width="100%"/>
</a>
<h3 id="kodi">Kodi</h3>
<ul>
<li>Install the <a href="https://github.com/rAcHekLoS/plugin.video.owncast">Owncast Kodi Plugin</a> by rAcHekLoS.</li>
</ul>
<h3 id="roku-1">Roku</h3>
<ul>
<li>Install the <a href="https://channelstore.roku.com/details/2179326b6b85869a1a3a18d48ca76de6/owncasts">Owncasts for Roku</a>. It currently shows what Owncast servers are on the directory.</li>
<li>Browse for the stream you wish to watch.</li>
</ul>
<a href="https://channelstore.roku.com/details/7419f1032ebbfe1c7dcc6e2f3f5c8767/owncast">
    <img src="/images/owncast-directory-roku.png" width="100%"/>
</a>
<h3 id="lg-tvs-webos-and-possibly-other-smart-tvs">LG TVs (WebOS and possibly other smart TVs)</h3>
<ol>
<li>Install <strong>SATV</strong> (free) from your smart TV&rsquo;s app store.</li>
<li>Run it and press button to <strong>&ldquo;Add Playlist&rdquo;</strong>.</li>
<li>Type in: <code>https://directory.owncast.online/api/iptv</code>. Make sure it&rsquo;s <em>https</em>.</li>
<li>Double check you typed it in correctly.</li>
<li>Save this playlist.</li>
<li>It will refresh the current live streams each time you launch the SATV app.</li>
<li>Choose the live stream you want to watch.</li>
</ol>
`}];e.add(n),userinput.addEventListener("input",s,!0),suggestions.addEventListener("click",o,!0);function s(){var n,i=this.value,s=e.search(i,5),o=suggestions.childNodes,r=0,c=s.length;for(suggestions.classList.remove("d-none"),s.forEach(function(e){n=document.createElement("div"),n.innerHTML="<a href><span></span><span></span></a>",a=n.querySelector("a"),t=n.querySelector("span:first-child"),d=n.querySelector("span:nth-child(2)"),a.href=e.href,t.textContent=e.title,d.textContent=e.description,suggestions.appendChild(n)});o.length>c;)suggestions.removeChild(o[r])}function o(){for(;suggestions.lastChild;)suggestions.removeChild(suggestions.lastChild);return!1}})()