const fakeDomains = [
  'test.com',
  'fake.com',
  'example.com',
  'example.org',
  'example.net',
  'sample.com',
  'dummy.com',
  'testing.com',
  'localhost.com',
  'domain.com',
  'email.com',
  'mail.com',
  'asdf.com',
  'qwerty.com',
  'abc.com',
  'xyz.com',
  '123.com',
  'zzz.com',
  'aaa.com',
  'qqq.com',
  'www.com',
  'notreal.com',
  'invalid.com',
  'nomail.com',
  'noemail.com',
  'fakeemail.com',
  'testmail.com',
  'dummymail.com'
];

const disposableEmailDomains = [
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.com',
  'throwaway.email',
  'temp-mail.org',
  'getnada.com',
  'trashmail.com',
  'fakeinbox.com',
  'yopmail.com',
  'maildrop.cc',
  'sharklasers.com',
  'guerrillamailblock.com',
  'grr.la',
  'spam4.me',
  'tempr.email',
  'disposablemail.com',
  'emailondeck.com',
  'mintemail.com',
  'dispostable.com',
  'mailnesia.com',
  'discard.email',
  'mohmal.com',
  'mytemp.email',
  'temp-link.net',
  'fakemail.net',
  'throwawaymail.com',
  'mailtemporaire.fr',
  'anonbox.net',
  'emailfake.com',
  'tempinbox.com',
  'throwam.com',
  'spambog.com',
  'jetable.org',
  'wegwerfmail.de',
  '20minutemail.com',
  '30minutemail.com',
  'incognitomail.com',
  'mailcatch.com',
  'mailexpire.com',
  'mailnull.com',
  'mailtothis.com',
  'mytrashmail.com',
  'no-spam.ws',
  'spam.la',
  'spambox.us',
  'spamfree24.org',
  'spamgourmet.com',
  'spamhole.com',
  'spaml.com',
  'spammotel.com',
  'speedymail.org',
  'tempemail.net',
  'tempmail.it',
  'tempmail.us',
  'trash-mail.com',
  'trashemail.de',
  'trashymail.com',
  'trbvm.com',
  'whatpaas.com',
  'zehnminutenmail.de',
  'zippymail.info',
  'anonymbox.com',
  'beefmilk.com',
  'binkmail.com',
  'bobmail.info',
  'boxformail.in',
  'bugmenot.com',
  'casualdx.com',
  'centermail.com',
  'centermail.net',
  'chogmail.com',
  'cool.fr.nf',
  'correo.com',
  'cosmorph.com',
  'courriel.fr.nf',
  'courrieltemporaire.com',
  'curryworld.de',
  'cust.in',
  'dacoolest.com',
  'dandikmail.com',
  'dayrep.com',
  'deadaddress.com',
  'deadspam.com',
  'despam.it',
  'devnullmail.com',
  'discardmail.com',
  'dodgeit.com',
  'dodgit.com',
  'dodgit.org',
  'donemail.ru',
  'dontreg.com',
  'dontsendmespam.de',
  'drdrb.com',
  'dump-email.info',
  'dumpmail.de',
  'dumpyemail.com',
  'e4ward.com',
  'email60.com',
  'emailage.com',
  'emaildienst.de',
  'emailias.com',
  'emailigo.de',
  'emailinfive.com',
  'emailmiser.com',
  'emailsensei.com',
  'emailtemporario.com.br',
  'emailto.de',
  'emailwarden.com',
  'emailx.at.hm',
  'emailxfer.com',
  'emeil.in',
  'emeil.ir',
  'emz.net',
  'enterto.com',
  'ephemail.net',
  'fakermail.com',
  'fastacura.com',
  'fastchevy.com',
  'fastchrysler.com',
  'fastkawasaki.com',
  'fastmazda.com',
  'fastmitsubishi.com',
  'fastnissan.com',
  'fastsubaru.com',
  'fastsuzuki.com',
  'fasttoyota.com',
  'fastyamaha.com',
  'filzmail.com',
  'fizmail.com',
  'fr33mail.info',
  'frapmail.com',
  'friendlymail.co.uk',
  'fuckingduh.com',
  'fudgerub.com',
  'fylitcl.com',
  'garliclife.com',
  'get1mail.com',
  'get2mail.fr',
  'getairmail.com',
  'getmails.eu',
  'getonemail.com',
  'getonemail.net',
  'ghosttexter.de',
  'girlsundertheinfluence.com',
  'gishpuppy.com',
  'great-host.in',
  'greensloth.com',
  'gsrv.co.uk',
  'guerillamail.biz',
  'guerillamail.com',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'gustr.com',
  'harakirimail.com',
  'hatespam.org',
  'hidemail.de',
  'hidzz.com',
  'hmamail.com',
  'hopemail.biz',
  'ieatspam.eu',
  'ieatspam.info',
  'ieh-mail.de',
  'ihateyoualot.info',
  'iheartspam.org',
  'imails.info',
  'inbax.tk',
  'inbox.si',
  'inboxalias.com',
  'inboxclean.com',
  'inboxclean.org',
  'incognitomail.org',
  'insorg-mail.info',
  'instant-mail.de',
  'ip6.li',
  'irish2me.com',
  'iwi.net',
  'jetable.com',
  'jetable.fr.nf',
  'jetable.net',
  'jetable.org',
  'jnxjn.com',
  'jourrapide.com',
  'jsrsolutions.com',
  'kasmail.com',
  'kaspop.com',
  'keepmymail.com',
  'killmail.com',
  'killmail.net',
  'kir.ch.tc',
  'klassmaster.com',
  'klzlk.com',
  'kostenlosemailadresse.de',
  'koszmail.pl',
  'kurzepost.de',
  'lawlita.com',
  'letthemeatspam.com',
  'lhsdv.com',
  'lifebyfood.com',
  'link2mail.net',
  'litedrop.com',
  'lol.ovpn.to',
  'lookugly.com',
  'lopl.co.cc',
  'lortemail.dk',
  'lr78.com',
  'lroid.com',
  'lukop.dk',
  'm21.cc',
  'mail-filter.com',
  'mail-temporaire.fr',
  'mail.by',
  'mail.mezimages.net',
  'mail2rss.org',
  'mail333.com',
  'mail4trash.com',
  'mailbidon.com',
  'mailblocks.com',
  'mailbucket.org',
  'mailcatch.com',
  'mailde.de',
  'mailde.info',
  'maildrop.cc',
  'maileater.com',
  'mailed.ro',
  'maileimer.de',
  'mailexpire.com',
  'mailfa.tk',
  'mailforspam.com',
  'mailfreeonline.com',
  'mailguard.me',
  'mailin8r.com',
  'mailinater.com',
  'mailinator.com',
  'mailinator.net',
  'mailinator.org',
  'mailinator2.com',
  'mailincubator.com',
  'mailismagic.com',
  'mailme.ir',
  'mailme.lv',
  'mailme24.com',
  'mailmetrash.com',
  'mailmoat.com',
  'mailnator.com',
  'mailnesia.com',
  'mailnull.com',
  'mailorg.org',
  'mailpick.biz',
  'mailrock.biz',
  'mailscrap.com',
  'mailshell.com',
  'mailsiphon.com',
  'mailslite.com',
  'mailtemp.info',
  'mailtome.de',
  'mailtothis.com',
  'mailtrash.net',
  'mailtv.net',
  'mailtv.tv',
  'mailzilla.com',
  'mailzilla.org',
  'makemetheking.com',
  'manybrain.com',
  'mbx.cc',
  'mega.zik.dj',
  'meinspamschutz.de',
  'meltmail.com',
  'messagebeamer.de',
  'mezimages.net',
  'ministry-of-silly-walks.de',
  'mintemail.com',
  'misterpinball.de',
  'moburl.com',
  'moncourrier.fr.nf',
  'monemail.fr.nf',
  'monmail.fr.nf',
  'monumentmail.com',
  'mt2009.com',
  'mt2014.com',
  'mycard.net.ua',
  'mycleaninbox.net',
  'mymail-in.net',
  'mypacks.net',
  'mypartyclip.de',
  'myphantomemail.com',
  'mysamp.de',
  'mytempemail.com',
  'mytempmail.com',
  'mytrashmail.com',
  'nabuma.com',
  'neomailbox.com',
  'nepwk.com',
  'nervmich.net',
  'nervtmich.net',
  'netmails.com',
  'netmails.net',
  'neverbox.com',
  'netzidiot.de',
  'nevermail.de',
  'nice-4u.com',
  'nincsmail.hu',
  'nnh.com',
  'no-spam.ws',
  'noblepioneer.com',
  'nomail.xl.cx',
  'nomail2me.com',
  'nomorespamemails.com',
  'nospam.ze.tc',
  'nospam4.us',
  'nospamfor.us',
  'nospammail.net',
  'notmailinator.com',
  'nowhere.org',
  'nowmymail.com',
  'nurfuerspam.de',
  'nus.edu.sg',
  'objectmail.com',
  'obobbo.com',
  'odnorazovoe.ru',
  'oneoffemail.com',
  'onewaymail.com',
  'onlatedotcom.info',
  'online.ms',
  'oopi.org',
  'opayq.com',
  'ordinaryamerican.net',
  'otherinbox.com',
  'ovpn.to',
  'owlpic.com',
  'pancakemail.com',
  'pimpedupmyspace.com',
  'pjjkp.com',
  'plexolan.de',
  'poczta.onet.pl',
  'politikerclub.de',
  'poofy.org',
  'pookmail.com',
  'privacy.net',
  'proxymail.eu',
  'prtnx.com',
  'putthisinyourspamdatabase.com',
  'quickinbox.com',
  'quickmail.nl',
  'rcpt.at',
  're-gister.com',
  'reallymymail.com',
  'realtyalerts.ca',
  'recode.me',
  'recursor.net',
  'regbypass.com',
  'regbypass.comsafe-mail.net',
  'rejectmail.com',
  'rklips.com',
  'rmqkr.net',
  'rppkn.com',
  'rtrtr.com',
  'rufey.com',
  's0ny.net',
  'safe-mail.net',
  'safersignup.de',
  'safetymail.info',
  'safetypost.de',
  'sandelf.de',
  'saynotospams.com',
  'schafmail.de',
  'schrott-email.de',
  'secretemail.de',
  'secure-mail.biz',
  'secure-mail.cc',
  'selfdestructingmail.com',
  'sendspamhere.com',
  'sharklasers.com',
  'shieldedmail.com',
  'shiftmail.com',
  'shitmail.me',
  'shitware.nl',
  'shmeriously.com',
  'shortmail.net',
  'sibmail.com',
  'sinnlos-mail.de',
  'slapsfromlastnight.com',
  'slaskpost.se',
  'slave-auctions.net',
  'slopsbox.com',
  'smashmail.de',
  'smellfear.com',
  'snakemail.com',
  'sneakemail.com',
  'sofimail.com',
  'solvemail.info',
  'sogetthis.com',
  'soodonims.com',
  'spam.la',
  'spam.su',
  'spam4.me',
  'spamail.de',
  'spamarrest.com',
  'spambob.com',
  'spambob.net',
  'spambob.org',
  'spambog.com',
  'spambog.de',
  'spambog.ru',
  'spambox.info',
  'spambox.irishspringrealty.com',
  'spambox.us',
  'spamcannon.com',
  'spamcannon.net',
  'spamcero.com',
  'spamcon.org',
  'spamcorptastic.com',
  'spamcowboy.com',
  'spamcowboy.net',
  'spamcowboy.org',
  'spamday.com',
  'spamex.com',
  'spamfree.eu',
  'spamfree24.com',
  'spamfree24.de',
  'spamfree24.eu',
  'spamfree24.info',
  'spamfree24.net',
  'spamfree24.org',
  'spamgoes.in',
  'spamgourmet.com',
  'spamgourmet.net',
  'spamgourmet.org',
  'spamherelots.com',
  'spamhereplease.com',
  'spamhole.com',
  'spamify.com',
  'spaminator.de',
  'spamkill.info',
  'spaml.com',
  'spaml.de',
  'spammotel.com',
  'spamobox.com',
  'spamoff.de',
  'spamslicer.com',
  'spamspot.com',
  'spamthis.co.uk',
  'spamthisplease.com',
  'spamtrail.com',
  'spamtrap.co',
  'speed.1s.fr',
  'spoofmail.de',
  'stuffmail.de',
  'super-auswahl.de',
  'supergreatmail.com',
  'supermailer.jp',
  'superrito.com',
  'superstachel.de',
  'suremail.info',
  'talkinator.com',
  'teewars.org',
  'teleworm.com',
  'teleworm.us',
  'temp-mail.com',
  'temp-mail.de',
  'temp-mail.org',
  'temp-mail.ru',
  'tempalias.com',
  'tempe-mail.com',
  'tempemail.biz',
  'tempemail.co.za',
  'tempemail.com',
  'tempemail.net',
  'tempinbox.co.uk',
  'tempinbox.com',
  'tempmail.de',
  'tempmail.eu',
  'tempmail.it',
  'tempmail.us',
  'tempmail2.com',
  'tempmaildemo.com',
  'tempmailer.com',
  'tempmailer.de',
  'tempomail.fr',
  'temporarily.de',
  'temporarioemail.com.br',
  'temporaryemail.net',
  'temporaryemail.us',
  'temporaryforwarding.com',
  'temporaryinbox.com',
  'temporarymailaddress.com',
  'tempthe.net',
  'thankyou2010.com',
  'thc.st',
  'thelimestones.com',
  'thisisnotmyrealemail.com',
  'thismail.net',
  'throwam.com',
  'throwawayemailaddress.com',
  'throwawaymail.com',
  'tilien.com',
  'tittbit.in',
  'tizi.com',
  'tmailinator.com',
  'toomail.biz',
  'topranklist.de',
  'tradermail.info',
  'trash-amil.com',
  'trash-mail.at',
  'trash-mail.com',
  'trash-mail.de',
  'trash2009.com',
  'trashemail.de',
  'trashmail.at',
  'trashmail.com',
  'trashmail.de',
  'trashmail.me',
  'trashmail.net',
  'trashmail.org',
  'trashmail.ws',
  'trashmailer.com',
  'trashymail.com',
  'trashymail.net',
  'trialmail.de',
  'trillianpro.com',
  'twinmail.de',
  'tyldd.com',
  'uggsrock.com',
  'umail.net',
  'uroid.com',
  'us.af',
  'venompen.com',
  'veryrealemail.com',
  'viditag.com',
  'viewcastmedia.com',
  'viewcastmedia.net',
  'viewcastmedia.org',
  'vpn.st',
  'vsimcard.com',
  'vubby.com',
  'wasteland.rfc822.org',
  'webemail.me',
  'weg-werf-email.de',
  'wegwerf-email-addressen.de',
  'wegwerf-emails.de',
  'wegwerfadresse.de',
  'wegwerfemail.com',
  'wegwerfemail.de',
  'wegwerfmail.de',
  'wegwerfmail.info',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'wetrainbayarea.com',
  'wetrainbayarea.org',
  'wh4f.org',
  'whatiaas.com',
  'whatpaas.com',
  'whyspam.me',
  'wilemail.com',
  'willselfdestruct.com',
  'winemaven.info',
  'wronghead.com',
  'wuzup.net',
  'wuzupmail.net',
  'www.e4ward.com',
  'www.mailinator.com',
  'wwwnew.eu',
  'x.ip6.li',
  'xagloo.com',
  'xemaps.com',
  'xents.com',
  'xmaily.com',
  'xoxy.net',
  'yep.it',
  'yogamaven.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'ypmail.webarnak.fr.eu.org',
  'yuurok.com',
  'z1p.biz',
  'ze.tc',
  'zehnminuten.de',
  'zehnminutenmail.de',
  'zetmail.com',
  'zippymail.info',
  'zoaxe.com',
  'zoemail.com',
  'zomg.info'
];

const fakeEmailPatterns = [
  /^test@/i,
  /^fake@/i,
  /^dummy@/i,
  /^sample@/i,
  /^example@/i,
  /^temp@/i,
  /^trash@/i,
  /^spam@/i,
  /^junk@/i,
  /^asdf@/i,
  /^qwerty@/i,
  /^123@/i,
  /^abc@/i,
  /^test\d+@/i,
  /^user@/i,
  /^admin@/i,
  /^noreply@/i,
  /^no-reply@/i,
  /@test\./i,
  /@fake\./i,
  /@example\./i,
  /@sample\./i,
  /@dummy\./i,
  /@testing\./i,
  /@localhost/i,
  /@temp\./i,
  /@trash\./i,
  /@spam\./i
];

const fakeDomainPatterns = [
  /^test\d*\.com$/i,
  /^fake\d*\.com$/i,
  /^dummy\d*\.com$/i,
  /^sample\d*\.com$/i,
  /^testing\d*\.com$/i,
  /^temp\d*\.com$/i,
  /^email\d*\.com$/i,
  /^mail\d*\.com$/i,
  /^asdf\d*\.com$/i,
  /^qwerty\d*\.com$/i,
  /^\d+\.com$/i,
  /^[a-z]{1,3}\.com$/i,
  /localhost/i,
  /\.local$/i,
  /\.test$/i,
  /\.invalid$/i,
  /\.example$/i
];

const validTLDs = [
  'com', 'org', 'net', 'edu', 'gov', 'mil', 'int',
  'co', 'io', 'ai', 'app', 'dev', 'tech', 'email',
  'us', 'uk', 'ca', 'au', 'de', 'fr', 'jp', 'cn', 'in', 'br',
  'info', 'biz', 'name', 'pro', 'xyz', 'online', 'store',
  'site', 'website', 'space', 'live', 'cloud', 'me', 'tv'
];

export interface EmailValidationResult {
  valid: boolean;
  message: string;
}

export function validateEmail(email: string): EmailValidationResult {
  if (!email || email.trim().length === 0) {
    return {
      valid: false,
      message: 'Email is required'
    };
  }

  email = email.trim().toLowerCase();

  const basicEmailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!basicEmailRegex.test(email)) {
    return {
      valid: false,
      message: 'Please enter a valid email address'
    };
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return {
      valid: false,
      message: 'Email must contain exactly one @ symbol'
    };
  }

  const [localPart, domain] = parts;

  if (localPart.length === 0) {
    return {
      valid: false,
      message: 'Email address cannot start with @'
    };
  }

  if (localPart.length > 64) {
    return {
      valid: false,
      message: 'Email username is too long'
    };
  }

  if (domain.length === 0 || domain.length > 255) {
    return {
      valid: false,
      message: 'Invalid email domain'
    };
  }

  if (domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) {
    return {
      valid: false,
      message: 'Invalid email domain format'
    };
  }

  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return {
      valid: false,
      message: 'Email domain must have a valid extension'
    };
  }

  const tld = domainParts[domainParts.length - 1].toLowerCase();
  if (!validTLDs.includes(tld)) {
    return {
      valid: false,
      message: 'Email domain has an invalid or unsupported extension'
    };
  }

  if (fakeDomains.includes(domain)) {
    return {
      valid: false,
      message: 'Please use a real email domain, not a test or fake domain'
    };
  }

  for (const pattern of fakeDomainPatterns) {
    if (pattern.test(domain)) {
      return {
        valid: false,
        message: 'Please use a real email domain, not a test or fake domain'
      };
    }
  }

  if (disposableEmailDomains.includes(domain)) {
    return {
      valid: false,
      message: 'Temporary or disposable email addresses are not allowed'
    };
  }

  for (const pattern of fakeEmailPatterns) {
    if (pattern.test(email)) {
      return {
        valid: false,
        message: 'Please use a real email address'
      };
    }
  }

  const consecutiveDots = /\.{2,}/;
  if (consecutiveDots.test(email)) {
    return {
      valid: false,
      message: 'Email cannot contain consecutive dots'
    };
  }

  const invalidChars = /[<>()[\]\\,;:\s@"]/;
  if (invalidChars.test(localPart.replace(/^"|"$/g, ''))) {
    return {
      valid: false,
      message: 'Email contains invalid characters'
    };
  }

  const domainWithoutTLD = domainParts.slice(0, -1).join('.');
  if (domainWithoutTLD.length === 0) {
    return {
      valid: false,
      message: 'Email domain is incomplete'
    };
  }

  const allNumbers = /^\d+$/;
  if (allNumbers.test(domainWithoutTLD.replace(/\./g, ''))) {
    return {
      valid: false,
      message: 'Please use a real email domain with a proper name'
    };
  }

  const suspiciouslyShort = /^[a-z]{1,2}$/i;
  if (domainParts.length === 2 && suspiciouslyShort.test(domainWithoutTLD)) {
    return {
      valid: false,
      message: 'Email domain appears invalid. Please use your real email'
    };
  }

  return {
    valid: true,
    message: 'Email is valid'
  };
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? disposableEmailDomains.includes(domain) : false;
}

export function isFakeDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  if (fakeDomains.includes(domain)) return true;

  return fakeDomainPatterns.some(pattern => pattern.test(domain));
}

export function isFakeEmailPattern(email: string): boolean {
  return fakeEmailPatterns.some(pattern => pattern.test(email.toLowerCase()));
}
