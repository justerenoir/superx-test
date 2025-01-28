const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Now create the client with the environment variables
const supabase = createClient(supabaseUrl, supabaseKey)

// Sample X posts about different topics
const samplePosts = [
  {
    content: "Just launched our new AI feature! The response from users has been incredible. #AI #Tech",
    author: "Sarah Chen",
    username: "@sarahcodes",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    likes: 1243,
    retweets: 284,
    comments: 89
  },
  {
    content: "5 tips for better React performance: 1) Use memo wisely 2) Optimize re-renders 3) Lazy loading 4) Virtual lists 5) Proper key usage #ReactJS",
    author: "David Kumar",
    username: "@davidthedev",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    likes: 2891,
    retweets: 943,
    comments: 156
  },
  {
    content: "The future of web development is serverless. Here's why your next project should consider this approach. Thread 🧵",
    author: "Emma Wilson",
    username: "@emmabuilds",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    likes: 1567,
    retweets: 432,
    comments: 78
  },
  {
    content: "TIL: Python's walrus operator := can make your code much more concise. Here's how to use it effectively 🐍 #Python #CodingTips",
    author: "Alex Rivera",
    username: "@pythonista",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    likes: 876,
    retweets: 234,
    comments: 45
  },
  {
    content: "Containerization best practices: 1) Use multi-stage builds 2) Minimize layers 3) Security scanning 4) Base image selection #Docker #DevOps",
    author: "Michelle Zhang",
    username: "@devopsmichelle",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    likes: 2103,
    retweets: 567,
    comments: 89
  },
  {
    content: "Just migrated our auth system to OAuth 2.0. Here's what we learned along the way... #Security #WebDev",
    author: "James Smith",
    username: "@securityjames",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    likes: 945,
    retweets: 201,
    comments: 67
  },
  {
    content: "Hot take: Tailwind CSS has revolutionized my frontend development workflow. Here's why... #CSS #Frontend",
    author: "Lisa Johnson",
    username: "@lisacodes",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    likes: 3421,
    retweets: 892,
    comments: 234
  },
  {
    content: "The hidden costs of technical debt: A thread on why addressing it early matters 💸 #SoftwareEngineering",
    author: "Marcus Brown",
    username: "@marcusdev",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    likes: 4532,
    retweets: 1203,
    comments: 345
  },
  {
    content: "Machine Learning deployment patterns: Best practices for serving ML models in production #ML #DevOps",
    author: "Priya Patel",
    username: "@mlpriya",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    likes: 1876,
    retweets: 543,
    comments: 98
  },
  {
    content: "Why we switched from MongoDB to PostgreSQL: A case study on database selection #Databases #Architecture",
    author: "Tom Wilson",
    username: "@dbtom",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    likes: 2765,
    retweets: 876,
    comments: 167
  },
  {
    content: "The art of code reviews: Tips for both reviewers and authors to make the process more effective 🤝 #BestPractices",
    author: "Nina Rodriguez",
    username: "@ninatech",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    likes: 1543,
    retweets: 432,
    comments: 87
  },
  {
    content: "Understanding React's new use hook: A complete guide with practical examples #React #JavaScript",
    author: "Kevin Lee",
    username: "@kevinreacts",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    likes: 3098,
    retweets: 867,
    comments: 156
  },
  {
    content: "How we scaled our API to handle 1M requests per minute using Redis and Kubernetes #Scaling #Backend",
    author: "Sophie Taylor",
    username: "@sophiescales",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    likes: 5432,
    retweets: 1432,
    comments: 234
  },
  {
    content: "Accessibility isn't optional: 5 simple ways to make your web apps more inclusive 🌐 #A11y #WebDev",
    author: "Carlos Martinez",
    username: "@a11ycarlos",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    likes: 2987,
    retweets: 876,
    comments: 167
  },
  {
    content: "Just discovered GitHub Copilot's new features. The code suggestions are getting scary good! #AI #Programming",
    author: "Rachel Kim",
    username: "@rachelcodes",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    likes: 1876,
    retweets: 543,
    comments: 98
  },
  {
    content: "POV: My cat watching me work from home for 8 hours straight 👁️👁️ \nCat: 'you live like this?' 😭 #WFHLife",
    author: "Amy Peters",
    username: "@amyandcat",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    likes: 145678,
    retweets: 52432,
    comments: 3456
  },
  {
    content: "Unpopular opinion: Pizza is just cheese toast with extra steps. Don't @ me 🍕",
    author: "Jake Williams",
    username: "@jakethefoodie",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
    likes: 234567,
    retweets: 78901,
    comments: 12345
  },
  {
    content: "Gen Z: 'The side part is outdated' \nMillennials: 'I survived the 2008 recession, you can't hurt me' 💀",
    author: "Sofia Rodriguez",
    username: "@sofiarodz",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    likes: 567890,
    retweets: 123456,
    comments: 45678
  },
  {
    content: "No one:\nAbsolutely no one:\nMy brain at 3AM: 'What if ducks had teeth?' 🦆",
    author: "Chris Murphy",
    username: "@chrismemes",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
    likes: 891234,
    retweets: 234567,
    comments: 56789
  },
  {
    content: "Life hack: Simply be born into a wealthy family to avoid financial problems 💅✨ #Finance #Investing",
    author: "Lucy Chang",
    username: "@lucyvibes",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    likes: 678901,
    retweets: 189012,
    comments: 23456
  },
  {
    content: "Breaking: Scientists confirm that people who don't use their turn signals are actually the center of the universe 🚗",
    author: "Tom Anderson",
    username: "@truthteller",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    likes: 456789,
    retweets: 123456,
    comments: 34567
  },
  {
    content: "My toxic trait is starting a new TV series at 11PM and thinking I'll just watch 'one episode' 📺",
    author: "Maria Garcia",
    username: "@mariawatch",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    likes: 345678,
    retweets: 89012,
    comments: 12345
  },
  {
    content: "Plot twist: Your AirPods aren't lost, they're just having a meeting with all your missing socks 🧦",
    author: "Ryan Cooper",
    username: "@ryanjoking",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    likes: 234567,
    retweets: 67890,
    comments: 9876
  },
  {
    content: "Normalize replying 'k' to long emotional texts 😌✨ (This is a joke, please don't do this) #Relationships",
    author: "Hannah Kim",
    username: "@hannahvibes",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    likes: 789012,
    retweets: 234567,
    comments: 45678
  },
  {
    content: "Day 1 of asking Elon Musk to give me $1M (he won't miss it tbh) 🚀",
    author: "Derek Mills",
    username: "@dreambig",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    likes: 912345,
    retweets: 345678,
    comments: 67890
  },
  {
    content: "Just finished my first marathon! 26.2 miles of pure determination. Remember: every mile is a victory 🏃‍♀️ #Running #Fitness",
    author: "Jessica Mills",
    username: "@runwithjess",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    likes: 2341,
    retweets: 342,
    comments: 156
  },
  {
    content: "Tonight's sunset in Bali took my breath away. Sometimes you need to pause and appreciate these moments ✨ #Travel #Wanderlust",
    author: "Mark Thompson",
    username: "@globetrotter",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    likes: 4532,
    retweets: 876,
    comments: 234
  },
  {
    content: "Just dropped my new album 'Midnight Dreams'! Thank you to all my fans for the incredible support 🎵 #NewMusic #Album",
    author: "Maya Jackson",
    username: "@mayasings",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    likes: 15678,
    retweets: 5432,
    comments: 2345
  },
  {
    content: "Made my grandmother's secret pasta recipe today. Food really does taste better when it's made with love ❤️ #Cooking #FoodLover",
    author: "Antonio Romano",
    username: "@chefantonio",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    likes: 3421,
    retweets: 567,
    comments: 234
  },
  {
    content: "What a game! That last-minute touchdown just secured our spot in the playoffs! 🏈 #NFL #Football",
    author: "Mike Johnson",
    username: "@sportsmike",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    likes: 6789,
    retweets: 1234,
    comments: 567
  },
  {
    content: "Just finished reading 'The Midnight Library'. This book completely changed my perspective on life. Must read! 📚 #Books #Reading",
    author: "Emily Brooks",
    username: "@bookwormemily",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    likes: 2345,
    retweets: 543,
    comments: 198
  },
  {
    content: "Breaking: Major climate agreement reached at UN summit. A historic day for environmental action 🌍 #ClimateChange #News",
    author: "Robert Chen",
    username: "@newsrobert",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    likes: 8765,
    retweets: 3456,
    comments: 789
  },
  {
    content: "My garden is finally blooming! There's something magical about growing your own food 🌱 #Gardening #Sustainable",
    author: "Laura Green",
    username: "@gardenlaura",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    likes: 1987,
    retweets: 432,
    comments: 156
  },
  {
    content: "My side project made $1 this month. Time to update my Twitter bio to 'Founder & CEO' 😤💅 #IndieHacker",
    author: "Alex Chen",
    username: "@solopreneurlife",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    likes: 234567,
    retweets: 78901,
    comments: 12345
  },
  {
    content: "Startup idea: An app that tells you if your startup idea already exists.\n\nWait...",
    author: "Sarah Miller",
    username: "@sarahbuilds",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    likes: 345678,
    retweets: 89012,
    comments: 23456
  },
  {
    content: "POV: You're a solo founder\n9am: I'm gonna change the world\n2pm: Maybe I'll learn to code\n7pm: Is Starbucks hiring? 📉📈",
    author: "Mike Ross",
    username: "@mikemaker",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    likes: 456789,
    retweets: 98765,
    comments: 34567
  },
  {
    content: "My mom: 'So when are you getting a real job?'\nMe: *checking my SaaS making $12/month*\nMe: 'I AM THE JOB' 😭",
    author: "Lisa Zhang",
    username: "@lisabuilds",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    likes: 567890,
    retweets: 123456,
    comments: 45678
  },
  {
    content: "No one:\nAbsolutely no one:\nIndieHackers: 'Here's how I turned my $0 side project into a $0.01 side project (THREAD) 🧵'",
    author: "Tom Baker",
    username: "@tomcodes",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    likes: 678901,
    retweets: 234567,
    comments: 56789
  },
  {
    content: "LinkedIn: 'Excited to announce...'\nTwitter: 'Holy sh*t our startup is on fire'\nDiscord: 'anyone know how to fix a prod bug?' 💀",
    author: "Jenny Park",
    username: "@jennybuilds",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    likes: 234567,
    retweets: 89012,
    comments: 12345
  },
  {
    content: "VC: What's your go-to-market strategy?\nMe: I post memes on Twitter and pray they go viral",
    author: "Dave Cohen",
    username: "@davemakes",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    likes: 345678,
    retweets: 90123,
    comments: 23456
  },
  {
    content: "Startup funding rounds explained:\nFriends & Family: Your savings\nSeed: Your credit card\nSeries A: Your soul",
    author: "Rachel Wong",
    username: "@startuplife",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    likes: 456789,
    retweets: 101234,
    comments: 34567
  },
  {
    content: "Year 1 of startup: Learn to code\nYear 2: Learn to sell\nYear 3: Learn to cope",
    author: "Sam Harris",
    username: "@samstartup",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    likes: 567890,
    retweets: 112345,
    comments: 45678
  },
  {
    content: "Therapist: 'How's your work-life balance?'\nMe: 'I'm a founder'\nTherapist: *writes frantically* 📝",
    author: "Emma Davis",
    username: "@emmafounds",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
    likes: 678901,
    retweets: 123456,
    comments: 56789
  },
  {
    content: "Things that don't exist:\n- Unicorns\n- Dragons\n- Overnight success\n- Your competitor's '10x growth in 2 months'",
    author: "Kevin Patel",
    username: "@kevinrealtalk",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    likes: 789012,
    retweets: 134567,
    comments: 67890
  },
  {
    content: "Startup idea: An app that automatically responds 'Interesting, let's schedule a call' to LinkedIn messages. \n\nShark Tank here I come 🦈",
    author: "Linda Martinez",
    username: "@lindatech",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    likes: 890123,
    retweets: 145678,
    comments: 78901
  },
  {
    content: "3 years into my startup:\nRevenue: $0\nBurnout: Infinite\nLinkedIn posts about success: Daily\n\nWe're crushing it 🚀",
    author: "Brian Wilson",
    username: "@briangrinding",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    likes: 901234,
    retweets: 156789,
    comments: 89012
  },
  {
    content: "My investment strategy:\n10% Research\n20% Technical Analysis\n70% Random Reddit posts saying 'Trust me bro' 📈",
    author: "Jason Lee",
    username: "@cryptojason",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    likes: 345678,
    retweets: 89012,
    comments: 23456
  },
  {
    content: "Portfolio: *drops 20%*\nMe: This is fine 🔥\nPortfolio: *goes up 0.01%*\nMe: I am a financial genius 🧠",
    author: "Emma Thompson",
    username: "@investwithemma",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    likes: 567890,
    retweets: 123456,
    comments: 34567
  },
  {
    content: "Crypto bros in 2021: 'Have fun staying poor! 🚀'\nCrypto bros in 2024: 'Sir, this is a Wendy's and I'm your manager'",
    author: "Mike Chang",
    username: "@mikecrypto",
    image: "https://randomuser.me/api/portraits/men/49.jpg",
    likes: 789012,
    retweets: 234567,
    comments: 45678
  },
  {
    content: "Financial advisor: 'Diversify your portfolio'\nMe: *buys different colored NFTs* 🎨",
    author: "Sarah Wilson",
    username: "@sarahinvests",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    likes: 456789,
    retweets: 98765,
    comments: 34567
  },
  {
    content: "Warren Buffett: 'Be fearful when others are greedy'\nMe: *panic selling at every dip*\nWarren Buffett: 'No, not like that' 😭",
    author: "David Kim",
    username: "@traderdave",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    likes: 678901,
    retweets: 167890,
    comments: 45678
  },
  {
    content: "My retirement plan:\n1% 401k\n99% Hoping one of my 47 domain names becomes valuable 🙏",
    author: "Lisa Brown",
    username: "@lisainvests",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    likes: 345678,
    retweets: 78901,
    comments: 23456
  },
  {
    content: "Stock market: *crashes*\nBoomers: 'Maybe skip the avocado toast'\nMillennials: 'I literally eat air for breakfast' 🥑",
    author: "Ryan Peters",
    username: "@investorryan",
    image: "https://randomuser.me/api/portraits/men/53.jpg",
    likes: 891234,
    retweets: 234567,
    comments: 56789
  },
  {
    content: "Financial literacy is important but have you tried manifesting money by putting a green candle under your pillow? ✨💸",
    author: "Amy Zhang",
    username: "@amyfinance",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
    likes: 567890,
    retweets: 123456,
    comments: 34567
  }
]

// Add retry logic for the embedding function
async function getEmbeddingWithRetry(text, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: text,
          model: "text-embedding-3-small"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      return data[0].embedding;
    } catch (error) {
      console.log(`Attempt ${i + 1} failed: ${error.message}`);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Helper function to chunk array into smaller pieces
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function seedDatabase() {
  console.log('Creating Supabase client...');
  
  // Process posts in smaller chunks
  const chunks = chunkArray(samplePosts, 5); // Process 5 posts at a time
  
  for (const chunk of chunks) {
    console.log(`Processing chunk of ${chunk.length} posts...`);
    
    for (const post of chunk) {
      try {
        console.log(`Processing post: ${post.content.substring(0, 50)}...`);
        
        const embedding = await getEmbeddingWithRetry(post.content);
        
        const { error } = await supabase
          .from('posts')
          .insert([
            {
              content: post.content,
              author: post.author,
              username: post.username,
              image: post.image,
              likes: post.likes,
              retweets: post.retweets,
              comments: post.comments,
              embedding
            }
          ]);

        if (error) {
          console.error('Error inserting post:', error);
        } else {
          console.log('Successfully inserted post');
        }
        
        // Add a small delay between posts to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`Failed to process post: ${error.message}`);
        // Continue with next post instead of stopping the entire process
        continue;
      }
    }
    
    // Add a longer delay between chunks
    console.log('Waiting before processing next chunk...');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('Seeding completed!');
}

seedDatabase().catch(console.error);

module.exports = {
  seedDatabase,
  samplePosts
};