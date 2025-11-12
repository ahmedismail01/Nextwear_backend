const request = async (options) => {
  try {
    let defaultOptions = {};
    const response = await fetch(options.url, {
      ...defaultOptions,
      ...options,
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const GET = async (options) => {
  return await request({ ...options, method: "GET" });
};

const POST = async (options) => {
  return await request({ ...options, method: "POST" });
};

const PUT = async (options) => {
  return await request({ ...options, method: "PUT" });
};

const DELETE = async (options) => {
  return await request({ ...options, method: "DELETE" });
};

module.exports = { GET, POST, PUT, DELETE };
