const validationId = (req, res, next) => {
  const rawId = req.params?.id ?? req.body?.id;

  if (rawId === undefined || rawId === null || String(rawId).trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'id khong duoc de trong',
    });
  }

  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: 'id khong hop le',
    });
  }

  if (req.params?.id !== undefined) {
    req.params.id = id;
  } else if (req.body) {
    req.body.id = id;
  }

  next();
};

const validationUsername = (req, res, next) => {
  const username = req.body?.username;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: 'Username khong duoc de trong',
    });
  }

  const usernameRegex = /^[a-zA-Z0-9_-]{8,30}$/;
  if (!usernameRegex.test(String(username).trim())) {
    return res.status(400).json({
      success: false,
      message: 'Username khong hop le',
    });
  }

  req.body.username = String(username).trim();
  next();
};

const validationPassword = (req, res, next) => {
  const password = req.body?.password;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password khong duoc de trong',
    });
  }

  const passStr = String(password);
  const isValidLength = passStr.length >= 8 && passStr.length <= 100;
  const hasLetter = /[a-zA-Z]/.test(passStr);
  const hasNumber = /[0-9]/.test(passStr);

  if (!isValidLength || !hasLetter || !hasNumber) {
    return res.status(400).json({
      success: false,
      message: 'Password khong hop le',
    });
  }

  next();
};

const validateQueryIntegers = (fields) => {
  return (req, res, next) => {
    for (const name of fields) {
      const rawValue = req.query?.[name];

      if (rawValue === undefined || rawValue === null || String(rawValue).trim() === '') {
        return res.status(400).json({
          success: false,
          message: `${name} khong duoc de trong`,
        });
      }

      const parsedValue = Number(rawValue);
      const minValue = name === 'offset' ? 0 : 1;

      if (!Number.isInteger(parsedValue) || parsedValue < minValue) {
        return res.status(400).json({
          success: false,
          message: `${name} khong hop le hoac bi thieu`,
        });
      }

      req.query[name] = parsedValue;
    }

    next();
  };
};

const validateCursorParams = validateQueryIntegers(['post_id', 'limit']);

const validateOffsetParams = validateQueryIntegers(['limit', 'offset']);

const validatePostBody = (body) => {
  const title = body?.title ? String(body.title).trim() : '';
  const content = body?.content ? String(body.content).trim() : '';
  const url = body?.url ? String(body.url).trim() : '';

  const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  let urlError = null;

  if (url && !urlRegex.test(url)) {
    urlError = 'url phai co dang https:// hoac http://';
  }

  return { title, content, url, urlError };
};

export const validateCreateComment = (req, res, next) => {
  const { _user_id, _post_id, _parent_id, content, urlError } = validatePostBody(req.body);

  if (!content) {
    return res.status(400).json({
      success: false,
      message: 'du lieu khong hop le',
    });
  }

  if (urlError) {
    return res.status(400).json({ success: false, message: urlError });
  }

  next();
};

export const validateUpdateComment = (req, res, next) => {
  const { content } = validatePostBody(req.body);

  if (!content) {
    return res.status(400).json({
      success: false,
      message: 'phai co noi dung',
    });
  }

  next();
};

export const validateCreatePost = (req, res, next) => {
  const { title, content, _url, urlError } = validatePostBody(req.body);

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'title va content khong duoc de trong',
    });
  }

  if (urlError) {
    return res.status(400).json({ success: false, message: urlError });
  }

  next();
};

export const validateUpdatePost = (req, res, next) => {
  const { title, content, url, urlError } = validatePostBody(req.body);

  if (!title && !content && !url) {
    return res.status(400).json({
      success: false,
      message: 'phai co it nhat 1 trong: title, content, url',
    });
  }

  if (urlError) {
    return res.status(400).json({ success: false, message: urlError });
  }

  next();
};
const validateUserParams = (req, res, next) => {
  const { email, username, password } = req.body || {};

  const hasEmail = email ? String(email).trim() : '';
  const hasUsername = username ? String(username).trim() : '';
  const hasPassword = password ? String(password).trim() : '';

  if (!hasEmail && !hasUsername && !hasPassword) {
    return res.status(400).json({
      success: false,
      message: 'phai co it nhat 1 trong: email, username, password',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (hasEmail) {
    if (!emailRegex.test(String(email.trim()))) {
      return res.status(400).json({
        success: false,
        message: 'email khong hop le',
      });
    }
  }

  next();
};

const validateParams = {
  validateUpdateComment,
  validateCreateComment,
  validationId,
  validationUsername,
  validationPassword,
  validateCursorParams,
  validateOffsetParams,
  validateCreatePost,
  validateUpdatePost,
  validateUserParams,
  validatePostBody,
};

export default validateParams;
