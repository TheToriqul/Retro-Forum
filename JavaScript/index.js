function displayPosts(posts) {
  const container = document.getElementById("postsContainer");
  container.innerHTML = posts
    .map(
      (post) => `
          <div class="border border-gray-200 p-4 rounded-lg hover:border-blue-500 transition-all">
              <div class="flex gap-4">
                  <div class="w-12 h-12 rounded-full bg-gray-200">
                      <img src="${post.image}" alt="avatar" class="w-full h-full rounded-full object-cover"/>
                  </div>
                  <div class="flex-1">
                      <div class="flex justify-between">
                          <p class="font-semibold">#${post.category}</p>
                          <p>Author: ${post.author.name}</p>
                      </div>
                      <h4 class="text-lg font-bold my-2">${post.title}</h4>
                      <p class="text-gray-600">${post.description}</p>
                      <div class="flex justify-between mt-4">
                          <div class="flex gap-4">
                              <span>💬 ${post.comment_count}</span>
                              <span>👁️ ${post.view_count}</span>
                              <span>⏰ ${post.posted_time} min</span>
                          </div>
                          <button class="btn btn-circle btn-sm" onclick="markAsRead(this)">
                              <img src="/api/placeholder/24/24" alt="read" />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      `
    )
    .join("");
}

// Display latest posts in the sidebar
function displayLatestPosts(posts) {
  const container = document.getElementById("latestPostsContainer");
  container.innerHTML = posts
    .map(
      (post) => `
          <div class="border border-gray-200 p-4 rounded-lg">
              <h4 class="font-bold">${post.title}</h4>
              <p class="text-gray-600 text-sm my-2">${post.description}</p>
              <div class="flex items-center gap-2">
                  <img src="${post.author.image}" alt="${post.author.name}" 
                      class="w-8 h-8 rounded-full"/>
                  <div>
                      <p class="font-semibold">${post.author.name}</p>
                      <p class="text-sm text-gray-500">${
                        post.author.designation || "Unknown"
                      }</p>
                  </div>
              </div>
          </div>
      `
    )
    .join("");
}

// Search functionality
const searchInput = document.getElementById("searchInput");
let searchTimeout;

searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = e.target.value.trim();
    if (query) {
      searchPosts(query);
    } else {
      fetchPosts();
    }
  }, 300);
});

async function searchPosts(query) {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${query}`
    );
    const data = await response.json();
    displayPosts(data.posts);
  } catch (error) {
    console.error("Error searching posts:", error);
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
  fetchLatestPosts();
});
